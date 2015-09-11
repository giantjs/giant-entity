/*global giant, flock */
(function () {
    "use strict";

    module("ContentHandlerSpawner");

    test("Conversion from HandlerSpawner", function () {
        var handlerSpawner = giant.HandlerSpawner.create('content');

        ok(handlerSpawner.isA(giant.ContentHandlerSpawner),
            "should return ContentHandlerSpawner instance");
    });
}());
