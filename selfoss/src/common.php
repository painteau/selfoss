<?php

use Dice\Dice;
use helpers\Configuration;
use helpers\DatabaseConnection;
use Monolog\Formatter\LineFormatter;
use Monolog\Handler\ErrorLogHandler;
use Monolog\Handler\NullHandler;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

require __DIR__ . '/constants.php';

/**
 * @param string $message
 *
 * @return never
 */
function boot_error($message) {
    http_response_code(500);
    header('Content-Type: text/plain');
    echo $message;
    exit(1);
}

$autoloader = @include __DIR__ . '/../vendor/autoload.php'; // we will show custom error
if ($autoloader === false) {
    boot_error('The PHP dependencies are missing. Did you run `composer install` in the selfoss directory?' . PHP_EOL);
}

$startup_error = error_get_last();

// F3 crashes when there were PHP startups error even though
// they might not affect the program (e.g. unable to load an extension).
// It also sets its own error_reporting value and uses the previous one
// as a signal to disable the initialization failure check.
error_reporting(0);

$f3 = Base::instance();

// Disable deprecation warnings.
// Dice uses ReflectionParameter::getClass(), which is deprecated in PHP 8
// but we have not set an error handler yet because it needs a Logger instantiated by Dice.
error_reporting(E_ALL & ~E_DEPRECATED);

$f3->set('AUTOLOAD', false);
$f3->set('BASEDIR', BASEDIR);

$configuration = new Configuration(__DIR__ . '/../config.ini', $_ENV);

$f3->set('DEBUG', $configuration->debug);
$f3->set('cache', $configuration->cache);

$dice = new Dice();

// DI rules
$substitutions = [
    'substitutions' => [
        // Instantiate configuration container.
        Configuration::class => [
            'instance' => function() use ($configuration) {
                return $configuration;
            },
            'shared' => true,
        ],

        // Choose database implementation based on config
        daos\DatabaseInterface::class => ['instance' => 'daos\\' . $configuration->dbType . '\\Database'],
        daos\ItemsInterface::class => ['instance' => 'daos\\' . $configuration->dbType . '\\Items'],
        daos\SourcesInterface::class => ['instance' => 'daos\\' . $configuration->dbType . '\\Sources'],
        daos\TagsInterface::class => ['instance' => 'daos\\' . $configuration->dbType . '\\Tags'],

        Dice::class => ['instance' => function() use ($dice) {
            return $dice;
        }],
    ],
];

$shared = array_merge($substitutions, [
    'shared' => true,
]);

$dice->addRule(Bramus\Router\Router::class, $shared);
$dice->addRule(helpers\Authentication::class, $shared);

// Database bridges
$dice->addRule(daos\Items::class, $shared);
$dice->addRule(daos\Sources::class, $shared);
$dice->addRule(daos\Tags::class, $shared);

// Database implementation
$dice->addRule(daos\DatabaseInterface::class, $shared);
$dice->addRule(daos\ItemsInterface::class, $shared);
$dice->addRule(daos\SourcesInterface::class, $shared);
$dice->addRule(daos\TagsInterface::class, $shared);

if ($configuration->isChanged('dbSocket') && $configuration->isChanged('dbHost')) {
    boot_error('You cannot set both `db_socket` and `db_host` options.' . PHP_EOL);
}

// Database connection
if ($configuration->dbType === 'sqlite') {
    if (!extension_loaded('pdo_sqlite')) {
        boot_error('Using SQLite database requires pdo_sqlite PHP extension. Please make sure you have it installed and enabled.');
    }
    $db_file = $configuration->dbFile;

    // create empty database file if it does not exist
    if (!is_file($db_file)) {
        touch($db_file);
    }

    // https://www.php.net/manual/en/ref.pdo-sqlite.connection.php
    $dsn = 'sqlite:' . $db_file;
    $dbParams = [
        $dsn,
    ];
} elseif ($configuration->dbType === 'mysql') {
    if (!extension_loaded('pdo_mysql')) {
        boot_error('Using MySQL database requires pdo_mysql PHP extension. Please make sure you have it installed and enabled.');
    }
    $socket = $configuration->dbSocket;
    $host = $configuration->dbHost;
    $port = $configuration->dbPort;
    $database = $configuration->dbDatabase;

    // https://www.php.net/manual/en/ref.pdo-mysql.connection.php
    if ($socket !== null) {
        $dsn = "mysql:unix_socket=$socket; dbname=$database";
    } elseif ($port !== null) {
        $dsn = "mysql:host=$host; port=$port; dbname=$database";
    } else {
        $dsn = "mysql:host=$host; dbname=$database";
    }

    $dbParams = [
        $dsn,
        $configuration->dbUsername,
        $configuration->dbPassword,
        [PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4;'],
        $configuration->dbPrefix,
    ];
} elseif ($configuration->dbType === 'pgsql') {
    if (!extension_loaded('pdo_pgsql')) {
        boot_error('Using PostgreSQL database requires pdo_pgsql PHP extension. Please make sure you have it installed and enabled.');
    }
    // PostgreSQL uses host key for socket.
    $host = $configuration->dbSocket !== null ? $configuration->dbSocket : $configuration->dbHost;
    $port = $configuration->dbPort;
    $database = $configuration->dbDatabase;

    // https://www.php.net/manual/en/ref.pdo-pgsql.connection.php
    if ($port !== null) {
        $dsn = "pgsql:host=$host; port=$port; dbname=$database";
    } else {
        $dsn = "pgsql:host=$host; dbname=$database";
    }

    $dbParams = [
        $dsn,
        $configuration->dbUsername,
        $configuration->dbPassword,
    ];
} else {
    throw new Exception('Unsupported value for db_type option: ' . $configuration->dbType);
}

$sqlParams = array_merge($shared, [
    'constructParams' => $dbParams,
]);

// Define regexp function for SQLite
if ($configuration->dbType === 'sqlite') {
    $sqlParams = array_merge($sqlParams, [
        'call' => [
            [
                // DB\SQL uses PDO instance through composition
                // and forwards calls of non-existent methods to it.
                // But Dice can only call existing methods.
                // Let’s walk around these limitations by directly
                // calling the __call magic method.
                '__call',
                [
                    // https://www.sqlite.org/lang_expr.html#the_like_glob_regexp_and_match_operators
                    'sqliteCreateFunction',
                    [
                        'regexp',
                        function($pattern, $text) {
                            return preg_match('/' . addcslashes($pattern, '/') . '/', $text);
                        },
                        2,
                    ],
                ],
            ],
        ],
    ]);
}

$dice->addRule(DatabaseConnection::class, $sqlParams);

$dice->addRule('$iconStorageBackend', [
    'instanceOf' => helpers\Storage\FileStorage::class,
    'constructParams' => [
        $configuration->datadir . '/favicons',
    ],
]);

$dice->addRule(helpers\IconStore::class, array_merge($shared, [
    'constructParams' => [
        ['instance' => '$iconStorageBackend'],
    ],
]));

$dice->addRule('$thumbnailStorageBackend', [
    'instanceOf' => helpers\Storage\FileStorage::class,
    'constructParams' => [
        $configuration->datadir . '/thumbnails',
    ],
]);

$dice->addRule(helpers\ThumbnailStore::class, array_merge($shared, [
    'constructParams' => [
        ['instance' => '$thumbnailStorageBackend'],
    ],
]));

// Fallback rule
$dice->addRule('*', $substitutions);

$dice->addRule(Logger::class, [
    'shared' => true,
    'constructParams' => ['selfoss'],
]);

$dice->addRule(helpers\FeedReader::class, [
    'constructParams' => [
        $configuration->cache,
    ],
]);

// init logger
$log = $dice->create(Logger::class);

if ($configuration->loggerLevel === 'NONE') {
    $handler = new NullHandler();
} else {
    $logger_destination = $configuration->loggerDestination;

    if (strpos($logger_destination, 'file:') === 0) {
        $handler = new StreamHandler(substr($logger_destination, 5), $configuration->loggerLevel);
    } elseif ($logger_destination === 'error_log') {
        $handler = new ErrorLogHandler(ErrorLogHandler::OPERATING_SYSTEM, $configuration->loggerLevel);
    } else {
        boot_error('The `logger_destination` option needs to be either `error_log` or a file path prefixed by `file:`.' . PHP_EOL);
    }

    $formatter = new LineFormatter(null, null, true, true);
    $formatter->includeStacktraces(true);
    $handler->setFormatter($formatter);
}
$log->pushHandler($handler);

if (isset($startup_error)) {
    $log->warn('PHP likely encountered a startup error: ', [$startup_error]);
}

// init error handling
$f3->set('ONERROR',
    function(Base $f3) use ($configuration, $log, $handler) {
        $exception = $f3->get('EXCEPTION');

        try {
            if ($exception) {
                $log->error($exception->getMessage(), ['exception' => $exception]);
            } else {
                $log->error($f3->get('ERROR.text'));
            }

            if ($configuration->debug !== 0) {
                echo 'An error occurred' . ': ';
                echo $f3->get('ERROR.text') . "\n";
                echo $f3->get('ERROR.trace');
            } else {
                if ($handler instanceof StreamHandler) {
                    echo 'An error occured, please check the log file “' . $handler->getUrl() . '”.' . PHP_EOL;
                } elseif ($handler instanceof ErrorLogHandler) {
                    echo 'An error occured, please check your system logs.' . PHP_EOL;
                } else {
                    echo 'An error occurred' . PHP_EOL;
                }
            }
        } catch (Exception $e) {
            echo 'Unable to write logs.' . PHP_EOL;
            echo $e->getMessage() . PHP_EOL;
        }
    }
);

if ($configuration->debug !== 0) {
    ini_set('display_errors', '0');
}
