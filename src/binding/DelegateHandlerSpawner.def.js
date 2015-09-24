/*global giant */
$oop.postpone(giant, 'DelegateHandlerSpawner', function () {
    "use strict";

    var base = giant.HandlerSpawner,
        self = base.extend();

    /**
     * @name giant.DelegateHandlerSpawner.create
     * @function
     * @returns {giant.DelegateHandlerSpawner}
     */

    /**
     * @class
     * @extends giant.HandlerSpawner
     */
    giant.DelegateHandlerSpawner = self
        .addMethods(/** @lends giant.DelegateHandlerSpawner# */{
            /**
             * @param {giant.EntityBound} instance
             * @param {string} methodName
             * @param {giant.EntityKey} entityKey
             * @returns {Function}
             */
            spawnHandler: function (instance, methodName, entityKey) {
                return function (event) {
                    var entityPath = entityKey.getEntityPath(),
                        affectedKey = event.sender,
                        affectedPath = affectedKey.getEntityPath(),
                        beforeNode,
                        afterNode;

                    if (affectedKey.equals(entityKey)) {
                        // observed entity changed
                        // same as if we were subscribing on the event itself
                        event.setAffectedKey(entityKey);
                        instance[methodName](event);
                    } else if (entityPath.isRelativeTo(affectedPath)) {
                        // entity on the parent chain changed

                        beforeNode = $data.Tree.create()
                            .setNode(affectedPath, event.beforeNode)
                            .getNode(entityPath);
                        afterNode = giant.entities.getNode(entityPath);

                        if (beforeNode !== afterNode) {
                            // entity has changed

                            // creating event that carries correct information
                            event = event.clone()
                                .setAffectedKey(entityKey)
                                .setBeforeNode(beforeNode)
                                .setAfterNode(afterNode);

                            instance[methodName](event);
                        }
                    }
                };
            }
        });
});

$oop.amendPostponed(giant, 'HandlerSpawner', function () {
    "use strict";

    giant.HandlerSpawner
        .addSurrogate(giant, 'DelegateHandlerSpawner', function (bindingType) {
            return bindingType === 'delegate';
        });
});