/*global $entity */
/*global module, test, expect, ok, equal, strictEqual, notStrictEqual, deepEqual, notDeepEqual, raises */
(function () {
    "use strict";

    module("DelegateHandlerSpawner");

    test("Conversion from HandlerSpawner", function () {
        var handlerSpawner = $entity.HandlerSpawner.create('delegate');

        ok(handlerSpawner.isA($entity.DelegateHandlerSpawner),
            "should return DelegateHandlerSpawner instance");
    });
}());
