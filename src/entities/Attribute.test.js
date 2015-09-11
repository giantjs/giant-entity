/*global giant */
(function () {
    "use strict";

    module("Attribute");

    test("Instantiation", function () {
        raises(function () {
            giant.Attribute.create();
        }, "should raise exception on missing document key argument");

        raises(function () {
            giant.Attribute.create('foo');
        }, "should raise exception on invalid document key argument");
    });

    test("Conversion from AttributeKey", function () {
        var attributeKey = giant.AttributeKey.create('foo/bar'.toDocumentKey(), 'baz'),
            attribute = attributeKey.toAttribute();

        ok(attribute.isA(giant.Attribute), "should return Attribute instance");
        strictEqual(attribute.entityKey, attributeKey, "should set attribute key");
    });

    test("Entity surrogate", function () {
        var attributeKey = giant.AttributeKey.create('foo/bar'.toDocumentKey(), 'baz'),
            entity = giant.Entity.create(attributeKey);

        ok(entity.isA(giant.Attribute), "should return Attribute instance");
        strictEqual(entity.entityKey, attributeKey, "should set attribute key");
    });

    test("Conversion from EntityKey", function () {
        var attributeKey = giant.AttributeKey.create('foo/bar'.toDocumentKey(), 'baz'),
            entity = attributeKey.toEntity();

        ok(entity.isA(giant.Attribute), "should return Attribute instance");
        strictEqual(entity.entityKey, attributeKey, "should set attribute key");
    });

    test("Parent entity getter", function () {
        var parentKey = 'foo/bar'.toDocumentKey(),
            attributeKey = giant.AttributeKey.create(parentKey, 'baz'),
            attribute = attributeKey.toEntity(),
            parentEntity = attribute.getParentEntity();

        ok(parentEntity.isA(giant.Entity), "should return Entity instance");
        ok(parentEntity.entityKey.equals(parentKey),
            "should return corresponding parent entity");
    });
}());
