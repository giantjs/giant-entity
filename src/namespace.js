/*jshint node:true */

/** @namespace */
var $entity = {};

/** @namespace */
var $assertion = $assertion || require('$entity-assertion');

/** @namespace */
var $oop = $oop || require('$entity-oop');

/** @namespace */
var $utils = $utils || require('$entity-utils');

/** @namespace */
var $data = $data || require('$entity-data');

/** @namespace */
var $event = $event || require('$entity-event');

if (typeof require === 'function') {
    require('$entity-templating');
}

/**
 * Native string class.
 * @name String
 * @class
 */

/**
 * Native array class.
 * @name Array
 * @class
 */

/**
 * @name $data.Hash
 * @class
 */

/**
 * @name $data.Path
 * @class
 */
