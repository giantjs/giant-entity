/*global giant */
$oop.postpone(giant, 'entityEventSpace', function () {
    "use strict";

    /**
     * Event space dedicated to entity events.
     * @type {$event.EventSpace}
     */
    giant.entityEventSpace = $event.EventSpace.create();
});
