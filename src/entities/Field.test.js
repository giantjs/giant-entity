(function () {
    "use strict";

    module("Field");

    test("Instantiation", function () {
        throws(function () {
            $entity.Field.create();
        }, "should raise exception on missing field key argument");

        throws(function () {
            $entity.Field.create('foo/bar/baz');
        }, "should raise exception on invalid field key argument");
    });

    test("Conversion from String", function () {
        var field = 'foo/bar/baz'.toField();

        ok(field.isA($entity.Field), "should return Field instance");
        equal(field.entityKey.toString(), 'foo/bar/baz', "should set field key");
    });

    test("Conversion from Array", function () {
        var field = ['foo', 'bar', 'baz'].toField();

        ok(field.isA($entity.Field), "should return Field instance");
        equal(field.entityKey.toString(), 'foo/bar/baz', "should set field key");
    });

    test("Conversion from FieldKey", function () {
        var fieldKey = ['foo', 'bar', 'baz'].toFieldKey(),
            field = fieldKey.toField();

        ok(field.isA($entity.Field), "should return Field instance");
        strictEqual(field.entityKey, fieldKey, "should set field key");
    });

    test("Entity surrogate", function () {
        var entity = $entity.Entity.create('foo/bar/baz'.toFieldKey());

        ok(entity.isA($entity.Field), "should return Field instance");
        equal(entity.entityKey.toString(), 'foo/bar/baz', "should set correct key");
    });

    test("Conversion from EntityKey", function () {
        var fieldKey = ['foo', 'bar', 'baz'].toFieldKey(),
            field = fieldKey.toEntity();

        ok(field.isA($entity.Field), "should return Field instance");
        strictEqual(field.entityKey, fieldKey, "should set field key");
    });

    test("Parent entity getter", function () {
        var field = ['foo', 'bar', 'baz'].toField(),
            parentEntity = field.getParentEntity(),
            fieldsEntity = field.entityKey.documentKey.toDocument().getFieldsEntity();

        ok(parentEntity.isA($entity.Entity), "should return an Entity instance");
        ok(parentEntity.entityKey.equals(fieldsEntity.entityKey),
            "should return corresponding fields entity");
    });

    test("Value entity getter", function () {
        var field = 'foo/bar/baz'.toField();

        strictEqual(field.getValueEntity(), field, "should return self");
    });

    test("Field value getter", function () {
        expect(2);

        var field = 'foo/bar/baz'.toField(),
            valueNode = {};

        field.addMocks({
            getNode: function () {
                ok(true, "should fetch field node");
                return valueNode;
            }
        });

        strictEqual(field.getValue(), valueNode, "should return field node");
    });

    test("Silent field value getter", function () {
        expect(2);

        var field = 'foo/bar/baz'.toField(),
            valueNode = {};

        field.addMocks({
            getSilentNode: function () {
                ok(true, "should fetch field node silently");
                return valueNode;
            }
        });

        strictEqual(field.getSilentValue(), valueNode, "should return field node");
    });

    test("Field value setter", function () {
        expect(2);

        var field = 'foo/bar/baz'.toField(),
            valueNode = {};

        field.addMocks({
            setNode: function (node) {
                strictEqual(node, valueNode, "should should set field node");
            }
        });

        strictEqual(field.setValue(valueNode), field, "should be chainable");
    });

    test("Serialization", function () {
        var field = 'foo/bar/baz'.toField();

        field.addMocks({
            getValue: function () {
                return 0;
            }
        });

        equal(field.toString(), '0', "should return field value, serialized");
    });
}());
