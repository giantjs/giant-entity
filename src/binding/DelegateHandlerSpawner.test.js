/*global giant */
/*global module, test, expect, ok, equal, strictEqual, notStrictEqual, deepEqual, notDeepEqual, raises */
(function () {
    "use strict";

    module("DelegateHandlerSpawner");

    test("Conversion from HandlerSpawner", function () {
        var handlerSpawner = giant.HandlerSpawner.create('delegate');

        ok(handlerSpawner.isA(giant.DelegateHandlerSpawner),
            "should return DelegateHandlerSpawner instance");
    });
}());
