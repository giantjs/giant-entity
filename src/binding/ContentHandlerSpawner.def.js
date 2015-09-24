/*global giant */
$oop.postpone(giant, 'ContentHandlerSpawner', function () {
    "use strict";

    var base = giant.HandlerSpawner,
        self = base.extend();

    /**
     * @name giant.ContentHandlerSpawner.create
     * @function
     * @returns {giant.ContentHandlerSpawner}
     */

    /**
     * @class
     * @extends giant.HandlerSpawner
     */
    giant.ContentHandlerSpawner = self
        .addMethods(/** @lends giant.ContentHandlerSpawner# */{
            /**
             * @param {giant.EntityBound} instance
             * @param {string} methodName
             * @returns {Function}
             */
            spawnHandler: function (instance, methodName) {
                return instance[methodName].bind(instance);
            }
        });
});

$oop.amendPostponed(giant, 'HandlerSpawner', function () {
    "use strict";

    giant.HandlerSpawner
        .addSurrogate(giant, 'ContentHandlerSpawner', function (bindingType) {
            return bindingType === 'content';
        });
});
