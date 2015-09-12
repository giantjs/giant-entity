/*global giant */
giant.postpone(giant, 'entityEventSpace', function () {
    "use strict";

    /**
     * Event space dedicated to entity events.
     * @type {giant.EventSpace}
     */
    giant.entityEventSpace = giant.EventSpace.create();
});
