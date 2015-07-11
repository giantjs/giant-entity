/*global giant, giant, giant, giant */
giant.postpone(giant, 'Entity', function () {
    "use strict";

    var shallowCopy = giant.Utils.shallowCopy;

    /**
     * Creates an Entity instance.
     * Entity instantiation is expected to be done via subclasses, unless there are suitable surrogates defined.
     * @name giant.Entity.create
     * @function
     * @param {giant.EntityKey} entityKey Identifies entity.
     * @returns {giant.Entity}
     */

    /**
     * The Entity class serves as the base class for all entities. It provides an API to access and modify the cache
     * node represented by the entity.
     * @class
     * @extends giant.Base
     */
    giant.Entity = giant.Base.extend()
        .addConstants(/** @lends giant.Entity */{
            /**
             * Signals that an absent entity has been accessed.
             * @constant
             */
            EVENT_ENTITY_ACCESS: 'giant.entity.access',

            /**
             * Signals that an entity node was changed.
             * @constant
             */
            EVENT_ENTITY_CHANGE: 'giant.entity.change'
        })
        .addMethods(/** @lends giant.Entity# */{
            /**
             * @param {giant.EntityKey} entityKey
             * @ignore
             */
            init: function (entityKey) {
                /**
                 * Key that identifies the entity.
                 * @type {giant.EntityKey}
                 */
                this.entityKey = entityKey;
            },

            /**
             * Fetches an Entity that is the current entity's parent.
             * Returns undefined by default. Subclasses need to override.
             * @returns {giant.Entity}
             */
            getParentEntity: function () {
                return undefined;
            },

            /**
             * Fetches an Attribute entity for the specified attribute name.
             * @param {string} attributeName
             * @returns {giant.Entity}
             */
            getAttribute: function (attributeName) {
                return this.entityKey.getAttributeKey(attributeName).toEntity();
            },

            /**
             * Fetches entity node from cache.
             * @returns {*}
             */
            getNode: function () {
                var entityPath = this.entityKey.getEntityPath(),
                    entityNode = giant.entities.getNode(entityPath);

                if (typeof entityNode === 'undefined') {
                    // triggering event about absent node
                    this.entityKey.triggerSync(this.EVENT_ENTITY_ACCESS);
                }

                return entityNode;
            },

            /**
             * Fetches entity node from cache, wrapped in a Hash instance.
             * @returns {giant.Hash}
             */
            getNodeAsHash: function () {
                return giant.Hash.create(this.getNode());
            },

            /**
             * Fetches entity node from cache without triggering access events.
             * @returns {*}
             */
            getSilentNode: function () {
                var entityPath = this.entityKey.getEntityPath();
                return giant.entities.getNode(entityPath);
            },

            /**
             * Fetches entity node from cache, wrapped in a Hash instance, without triggering access events.
             * @returns {giant.Hash}
             */
            getSilentNodeAsHash: function () {
                return giant.Hash.create(this.getSilentNode());
            },

            /**
             * Touches entity node, triggering access event when absent, but not returning the node itself.
             * @returns {giant.Entity}
             */
            touchNode: function () {
                this.getNode();
                return this;
            },

            /**
             * Replaces entity node with the specified value.
             * @param {*} node
             * @returns {giant.Entity}
             */
            setNode: function (node) {
                var entityKey = this.entityKey,
                    beforeNode = this.getSilentNode();

                if (node !== beforeNode) {
                    giant.entities.setNode(entityKey.getEntityPath(), node);

                    entityKey.spawnEvent(this.EVENT_ENTITY_CHANGE)
                        .setBeforeNode(beforeNode)
                        .setAfterNode(node)
                        .triggerSync();
                }

                return this;
            },

            /**
             * Appends the specified node to the current node. Performs a shallow-merge.
             * In case of conflicts, the specified node's properties win out.
             * Triggering the event shallow copies the entire starting contents of the collection.
             * Do not use on large collections.
             * @param {object} node
             * @returns {giant.Entity}
             */
            appendNode: function (node) {
                var that = this,
                    entityKey = this.entityKey,
                    entityPath = entityKey.getEntityPath(),
                    entityNode = this.getSilentNode(),
                    beforeNode = shallowCopy(entityNode);

                giant.entities.appendNode(entityPath, node, function () {
                    entityKey.spawnEvent(that.EVENT_ENTITY_CHANGE)
                        .setBeforeNode(beforeNode)
                        .setAfterNode(that.getSilentNode())
                        .triggerSync();
                });

                return this;
            },

            /**
             * Removes entity node from cache.
             * @returns {giant.Entity}
             */
            unsetNode: function () {
                var entityKey = this.entityKey,
                    entityPath = entityKey.getEntityPath(),
                    beforeNode = this.getSilentNode();

                if (typeof beforeNode !== 'undefined') {
                    giant.entities.unsetNode(entityPath);

                    entityKey.spawnEvent(this.EVENT_ENTITY_CHANGE)
                        .setBeforeNode(beforeNode)
                        .triggerSync();
                }

                return this;
            },

            /**
             * Removes entity from cache, altering the parent node.
             * Performs shallow copy of the node, not recommended to use with large nodes,
             * eg. large collections.
             * @param {boolean} [splice] Whether to splice the parent node if it's an Array.
             * @returns {giant.Entity}
             */
            unsetKey: function (splice) {
                var that = this,
                    parentEntity = this.getParentEntity(),
                    parentNodeBefore = shallowCopy(parentEntity.getNode()),
                    entityPath = this.entityKey.getEntityPath();

                giant.entities.unsetKey(entityPath, splice, function (parentPath, parentNodeAfter) {
                    parentEntity.entityKey
                        .spawnEvent(that.EVENT_ENTITY_CHANGE)
                        .setBeforeNode(parentNodeBefore)
                        .setAfterNode(parentNodeAfter)
                        .triggerSync();
                });

                return this;
            }
        });
});

giant.amendPostponed(giant, 'EntityKey', function () {
    "use strict";

    giant.EntityKey
        .addMethods(/** @lends giant.EntityKey */{
            /** @returns {giant.Entity} */
            toEntity: function () {
                return giant.Entity.create(this);
            }
        });
});
