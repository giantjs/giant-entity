/*global giant, flock */
(function () {
    "use strict";

    module("FieldHandlerSpawner");

    test("Conversion from HandlerSpawner", function () {
        var handlerSpawner = giant.HandlerSpawner.create('field');

        ok(handlerSpawner.isA(giant.FieldHandlerSpawner),
            "should return FieldHandlerSpawner instance");
    });
}());
