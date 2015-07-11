/*global giant, giant, giant, giant */
giant.postpone(giant, 'StrictHandlerSpawner', function () {
    "use strict";

    var base = giant.HandlerSpawner,
        self = base.extend();

    /**
     * @name giant.StrictHandlerSpawner.create
     * @function
     * @returns {giant.StrictHandlerSpawner}
     */

    /**
     * @class
     * @extends giant.HandlerSpawner
     */
    giant.StrictHandlerSpawner = self
        .addMethods(/** @lends giant.StrictHandlerSpawner# */{
            /**
             * @param {giant.EntityBound} instance
             * @param {string} methodName
             * @param {giant.FieldKey} entityKey
             * @returns {Function}
             */
            spawnHandler: function (instance, methodName, entityKey) {
                return function (event) {
                    if (event.sender.equals(entityKey)) {
                        instance[methodName](event);
                    }
                };
            }
        });
});

giant.amendPostponed(giant, 'HandlerSpawner', function () {
    "use strict";

    giant.HandlerSpawner
        .addSurrogate(giant, 'StrictHandlerSpawner', function (bindingType) {
            return bindingType === 'strict';
        });
});