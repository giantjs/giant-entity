$oop.postpone($entity, 'DelegateHandlerSpawner', function () {
    "use strict";

    var base = $entity.HandlerSpawner,
        self = base.extend();

    /**
     * @name $entity.DelegateHandlerSpawner.create
     * @function
     * @returns {$entity.DelegateHandlerSpawner}
     */

    /**
     * @class
     * @extends $entity.HandlerSpawner
     */
    $entity.DelegateHandlerSpawner = self
        .addMethods(/** @lends $entity.DelegateHandlerSpawner# */{
            /**
             * @param {$entity.EntityBound} instance
             * @param {string} methodName
             * @param {$entity.EntityKey} entityKey
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
                        afterNode = $entity.entities.getNode(entityPath);

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

$oop.amendPostponed($entity, 'HandlerSpawner', function () {
    "use strict";

    $entity.HandlerSpawner
        .addSurrogate($entity, 'DelegateHandlerSpawner', function (bindingType) {
            return bindingType === 'delegate';
        });
});