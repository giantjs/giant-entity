/*global giant */
giant.postpone(giant, 'index', function () {
    "use strict";

    /**
     * Contains indexes and lookups.
     * @type {giant.Tree}
     */
    giant.index = giant.Tree.create();
});
