/*global giant */
$oop.postpone(giant, 'HandlerSpawner', function () {
    "use strict";

    var base = $oop.Base,
        self = base.extend();

    /**
     * @name giant.HandlerSpawner.create
     * @function
     * @param {string} [bindingType]
     * @returns {giant.HandlerSpawner}
     */

    /**
     * @class
     * @extends $oop.Base
     */
    giant.HandlerSpawner = self
        .addMethods(/** @lends giant.HandlerSpawner# */{
            /**
             * @param {string} [bindingType]
             * @ignore
             */
            init: function (bindingType) {
                /** @type {string} */
                this.bindingType = bindingType;
            }
        });

    /**
     * @name giant.HandlerSpawner#spawnHandler
     * @function
     * @param {giant.EntityBound} instance
     * @param {string} methodName
     * @returns {Function}
     */
});