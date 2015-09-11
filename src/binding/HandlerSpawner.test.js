/*global giant, flock */
(function () {
    "use strict";

    module("HandlerSpawner");

    test("Instantiation", function () {
        var handlerSpawner = giant.HandlerSpawner.create('foo');

        equal(handlerSpawner.bindingType, 'foo', "should set bindingType property");
    });
}());
