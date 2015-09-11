/*global giant */
(function () {
    "use strict";

    module("ReferenceItemKey");

    test("Instantiation", function () {
        var itemKey = giant.ReferenceItemKey.create('hello', 'world', 'foo', 'bar/baz');

        equal(itemKey.itemId, 'bar/baz', "should set item ID");
        ok(itemKey.referenceKey.equals('bar/baz'.toDocumentKey()), "should set reference key");
    });

    test("Conversion from String", function () {
        var itemKey;

        itemKey = 'hello/world/foo/bar\\/baz'.toReferenceItemKey();
        equal(itemKey.itemId, 'bar/baz', "should set item ID");
        ok(itemKey.referenceKey.equals('bar/baz'.toDocumentKey()), "should set reference key");

        itemKey = 'hello/world/foo/bar'.toReferenceItemKey();
        equal(typeof itemKey, 'undefined', "should return undefined for invalid item ID");
    });

    test("Conversion from Array", function () {
        var itemKey;

        itemKey = ['hello', 'world', 'foo', 'bar/baz'].toReferenceItemKey();
        equal(itemKey.itemId, 'bar/baz', "should set item ID");
        ok(itemKey.referenceKey.equals('bar/baz'.toDocumentKey()), "should set reference key");

        itemKey = ['hello', 'world', 'foo', 'bar'].toReferenceItemKey();
        equal(typeof itemKey, 'undefined', "should undefined for invalid item ID");
    });

    test("ItemKey surrogate", function () {
        var itemKey = giant.ItemKey.create('hello', 'world', 'foo', 'bar/baz');

        ok(itemKey.isA(giant.ReferenceItemKey), "should return ReferenceKey instance");
        equal(itemKey.itemId, 'bar/baz', "should set item ID");
        ok(itemKey.referenceKey.equals('bar/baz'.toDocumentKey()), "should set reference key");
    });
}());
