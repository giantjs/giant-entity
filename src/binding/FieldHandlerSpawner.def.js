/*global giant */
giant.postpone(giant, 'FieldHandlerSpawner', function () {
    "use strict";

    var base = giant.HandlerSpawner,
        self = base.extend();

    /**
     * @name giant.FieldHandlerSpawner.create
     * @function
     * @returns {giant.FieldHandlerSpawner}
     */

    /**
     * @class
     * @extends giant.HandlerSpawner
     */
    giant.FieldHandlerSpawner = self
        .addMethods(/** @lends giant.FieldHandlerSpawner# */{
            /**
             * @param {giant.EntityBound} instance
             * @param {string} methodName
             * @param {giant.FieldKey} fieldKey
             * @returns {Function}
             */
            spawnHandler: function (instance, methodName, fieldKey) {
                return function (event) {
                    var affectedKey = event.sender,
                        fieldPath,
                        beforeNode,
                        afterNode;

                    if (affectedKey.equals(fieldKey)) {
                        // field changed
                        // same as if we were subscribing on the event itself
                        event.setAffectedKey(fieldKey);
                        instance[methodName](event);
                    } else if (affectedKey.equals(fieldKey.documentKey)) {
                        // document changed

                        fieldPath = fieldKey.getEntityPath();
                        beforeNode = giant.Tree.create()
                            .setNode(affectedKey.getEntityPath(), event.beforeNode)
                            .getNode(fieldPath);
                        afterNode = giant.entities.getNode(fieldPath);

                        if (beforeNode !== afterNode) {
                            // field has changed

                            // creating event that carries correct information
                            event = event.clone()
                                .setAffectedKey(fieldKey)
                                .setBeforeNode(beforeNode)
                                .setAfterNode(afterNode);

                            instance[methodName](event);
                        }
                    }
                };
            }
        });
});

giant.amendPostponed(giant, 'HandlerSpawner', function () {
    "use strict";

    giant.HandlerSpawner
        .addSurrogate(giant, 'FieldHandlerSpawner', function (bindingType) {
            return bindingType === 'field';
        });
});