/*global giant, giant, giant, flock, giant */
/*global module, test, expect, ok, equal, strictEqual, notStrictEqual, deepEqual, notDeepEqual, raises */
(function () {
    "use strict";

    module("StrictHandlerSpawner");

    test("Conversion from HandlerSpawner", function () {
        var handlerSpawner = giant.HandlerSpawner.create('strict');

        ok(handlerSpawner.isA(giant.StrictHandlerSpawner),
            "should return StrictHandlerSpawner instance");
    });
}());
