<?php

namespace spouts\rss;

/**
 * Plugin for fetching the news from Teltarif with the full text
 *
 * @copyright  Copyright (c) Martin Sauter (http://www.wirelessmoves.com)
 * @license    GPLv3 (https://www.gnu.org/licenses/gpl-3.0.html)
 * @author     Martin Sauter  <martin.sauter@wirelessmoves.com>
 * @author     Tobias Zeising <tobias.zeising@aditu.de>
 * @author     Daniel Seither <post@tiwoc.de>
 */
class teltarif extends fulltextrss {
    /** @var string name of spout */
    public $name = '[German] teltarif.de';

    /** @var string description of this source type */
    public $description = 'Fetch Telarif news with full content (not only the header as content).';

    /** @var array configurable parameters */
    public $params = [];

    /**
     * addresses of feeds for the sections
     */
    const FEED_URL = 'http://www.teltarif.de/feed/news/20.rss2';

    public function load(array $params) {
        parent::load(['url' => $this->getXmlUrl($params)]);
    }

    /**
     * @return string
     */
    public function getXmlUrl(array $params) {
        return self::FEED_URL;
    }
}
