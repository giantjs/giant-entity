/*global giant, flock */
/*global module, test, expect, ok, equal, strictEqual, notStrictEqual, deepEqual, notDeepEqual, raises */
(function () {
    "use strict";

    module("FieldHandlerSpawner");

    test("Conversion from HandlerSpawner", function () {
        var handlerSpawner = giant.HandlerSpawner.create('field');

        ok(handlerSpawner.isA(giant.FieldHandlerSpawner),
            "should return FieldHandlerSpawner instance");
    });
}());
