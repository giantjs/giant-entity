/*global giant */
$oop.postpone(giant, 'index', function () {
    "use strict";

    /**
     * Contains indexes and lookups.
     * @type {$data.Tree}
     */
    giant.index = $data.Tree.create();
});
