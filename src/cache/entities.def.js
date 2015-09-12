/*global giant */
giant.postpone(giant, 'entities', function () {
    "use strict";

    /**
     * Contains entities.
     * @type {giant.Tree}
     */
    giant.entities = giant.Tree.create();
});
