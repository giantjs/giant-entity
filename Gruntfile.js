/*jshint node:true */
module.exports = function (grunt) {
    "use strict";

    var params = {
        files: [
            'src/namespace.js',
            'src/globals/entityEventSpace.js',
            'src/cache/config.js',
            'src/cache/entities.js',
            'src/cache/index.js',
            'src/events/EntityChangeEvent.js',
            'src/keys/EntityKey.js',
            'src/keys/AttributeKey.js',
            'src/keys/DocumentKey.js',
            'src/keys/DocumentKeyCollection.js',
            'src/keys/FieldKey.js',
            'src/keys/ItemKey.js',
            'src/keys/ReferenceItemKey.js',
            'src/entities/Entity.js',
            'src/entities/Attribute.js',
            'src/entities/Document.js',
            'src/entities/Field.js',
            'src/entities/CollectionField.js',
            'src/entities/OrderedCollectionField.js',
            'src/entities/Item.js',
            'src/binding/HandlerSpawner.js',
            'src/binding/ContentHandlerSpawner.js',
            'src/binding/StrictHandlerSpawner.js',
            'src/binding/DelegateHandlerSpawner.js',
            'src/binding/EntityBound.js',
            'src/exports.js'
        ],

        test: [
            'src/keys/jsTestDriver.conf',
            'src/entities/jsTestDriver.conf',
            'src/events/jsTestDriver.conf',
            'src/binding/jsTestDriver.conf'
        ],

        globals: {}
    };

    // invoking common grunt process
    require('common-gruntfile')(grunt, params);
};
