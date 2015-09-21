/*global giant, flock */
giant.postpone(giant, 'EntityBound', function () {
    "use strict";

    /**
     * The EntityBound trait binds instances of the host class to entity events.
     * @class
     * @extends giant.Base
     */
    giant.EntityBound = giant.Base.extend()
        .addPrivateMethods(/** @lends giant.EntityBound# */{
            /**
             * @param {giant.EntityKey} targetKey
             * @param {giant.EntityKey} captureKey
             * @param {string} eventName
             * @param {string} methodName
             * @param {string} bindingType
             * @private
             */
            _bindToEntity: function (targetKey, captureKey, eventName, methodName, bindingType) {
                var entityBindings = this.entityBindings,
                    bindingPath = [targetKey.toString(), eventName, methodName, bindingType].toPath(),
                    bindingInfo = entityBindings.getNode(bindingPath),
                    handler;

                if (!bindingInfo) {
                    handler = giant.HandlerSpawner.create(bindingType)
                        .spawnHandler(this, methodName, targetKey);
                    captureKey.subscribeTo(eventName, handler);
                    entityBindings.setNode(bindingPath, {
                        targetKey  : targetKey,
                        captureKey : captureKey,
                        eventName  : eventName,
                        methodName : methodName,
                        bindingType: bindingType,
                        handler    : handler
                    });
                }
            },

            /**
             * @param {giant.EntityKey} targetKey
             * @param {giant.EntityKey} captureKey
             * @param {string} eventName
             * @param {string} methodName
             * @param {string} bindingType
             * @private
             */
            _unbindFromEntity: function (targetKey, captureKey, eventName, methodName, bindingType) {
                var entityBindings = this.entityBindings,
                    bindingPath = [targetKey.toString(), eventName, methodName, bindingType].toPath(),
                    bindingInfo = entityBindings.getNode(bindingPath),
                    handler;

                if (bindingInfo) {
                    handler = bindingInfo.handler;
                    captureKey.unsubscribeFrom(eventName, handler);
                    entityBindings.unsetPath(bindingPath);
                }
            }
        })
        .addMethods(/** @lends giant.EntityBound# */{
            /** Call from host class .init(). */
            init: function () {
                /** @type {giant.Tree} */
                this.entityBindings = giant.Tree.create();
            },

            /**
             * Subscribes method to be triggered on the specified custom event passing through the entity.
             * @param {giant.EntityKey} entityKey
             * @param {string} eventName
             * @param {string} methodName
             * @returns {giant.EntityBound}
             */
            bindToEntityContent: function (entityKey, eventName, methodName) {
                giant
                    .isEntityKey(entityKey, "Invalid entity key")
                    .isString(eventName, "Invalid event name")
                    .isFunction(this[methodName], "Attempting to bind non-method");

                this._bindToEntity(entityKey, entityKey, eventName, methodName, 'content');

                return this;
            },

            /**
             * Unsubscribes method from the specified custom event passing through the entity.
             * @param {giant.EntityKey} entityKey
             * @param {string} eventName
             * @param {string} methodName
             * @returns {giant.EntityBound}
             */
            unbindFromEntityContent: function (entityKey, eventName, methodName) {
                giant
                    .isEntityKey(entityKey, "Invalid entity key")
                    .isString(eventName, "Invalid event name")
                    .isFunction(this[methodName], "Attempting to unbind non-method");

                this._unbindFromEntity(entityKey, entityKey, eventName, methodName, 'content');

                return this;
            },

            /**
             * Subscribes method to be triggered on the specified custom event is triggered on the specified entity.
             * @param {giant.EntityKey} entityKey
             * @param {string} eventName
             * @param {string} methodName
             * @returns {giant.EntityBound}
             */
            bindToEntity: function (entityKey, eventName, methodName) {
                giant
                    .isEntityKey(entityKey, "Invalid entity key")
                    .isString(eventName, "Invalid event name")
                    .isFunction(this[methodName], "Attempting to bind non-method");

                this._bindToEntity(entityKey, entityKey, eventName, methodName, 'strict');

                return this;
            },

            /**
             * Unsubscribes method from the specified custom event triggered on the specified entity.
             * @param {giant.EntityKey} entityKey
             * @param {string} eventName
             * @param {string} methodName
             * @returns {giant.EntityBound}
             */
            unbindFromEntity: function (entityKey, eventName, methodName) {
                giant
                    .isEntityKey(entityKey, "Invalid entity key")
                    .isString(eventName, "Invalid event name")
                    .isFunction(this[methodName], "Attempting to unbind non-method");

                this._unbindFromEntity(entityKey, entityKey, eventName, methodName, 'strict');

                return this;
            },

            /**
             * Subscribes method to be triggered on any access event passing through the entity.
             * @param {giant.EntityKey} entityKey
             * @param {string} methodName
             * @returns {giant.EntityBound}
             */
            bindToEntityContentAccess: function (entityKey, methodName) {
                giant
                    .isEntityKey(entityKey, "Invalid entity key")
                    .isFunction(this[methodName], "Attempting to bind non-method");

                this._bindToEntity(
                    entityKey,
                    entityKey,
                    giant.EVENT_ENTITY_ACCESS,
                    methodName,
                    'content');

                return this;
            },

            /**
             * Unsubscribes method from access events passing through the entity.
             * @param {giant.EntityKey} entityKey
             * @param {string} methodName
             * @returns {giant.EntityBound}
             */
            unbindFromEntityContentAccess: function (entityKey, methodName) {
                giant
                    .isEntityKey(entityKey, "Invalid entity key")
                    .isFunction(this[methodName], "Attempting to unbind non-method");

                this._unbindFromEntity(
                    entityKey,
                    entityKey,
                    giant.EVENT_ENTITY_ACCESS,
                    methodName,
                    'content');

                return this;
            },

            /**
             * Subscribes method to be triggered when the specified entity is accessed.
             * @param {giant.EntityKey} entityKey
             * @param {string} methodName
             * @returns {giant.EntityBound}
             */
            bindToEntityAccess: function (entityKey, methodName) {
                giant
                    .isEntityKey(entityKey, "Invalid entity key")
                    .isFunction(this[methodName], "Attempting to bind non-method");

                this._bindToEntity(
                    entityKey,
                    entityKey,
                    giant.EVENT_ENTITY_ACCESS,
                    methodName,
                    'strict');

                return this;
            },

            /**
             * Unsubscribes method from access events triggered on the specified entity.
             * @param {giant.EntityKey} entityKey
             * @param {string} methodName
             * @returns {giant.EntityBound}
             */
            unbindFromEntityAccess: function (entityKey, methodName) {
                giant
                    .isEntityKey(entityKey, "Invalid entity key")
                    .isFunction(this[methodName], "Attempting to unbind non-method");

                this._unbindFromEntity(
                    entityKey,
                    entityKey,
                    giant.EVENT_ENTITY_ACCESS,
                    methodName,
                    'strict');

                return this;
            },

            /**
             * Subscribes method to be triggered on any change event passing through the entity.
             * @param {giant.EntityKey} entityKey
             * @param {string} methodName
             * @returns {giant.EntityBound}
             */
            bindToEntityContentChange: function (entityKey, methodName) {
                giant
                    .isEntityKey(entityKey, "Invalid entity key")
                    .isFunction(this[methodName], "Attempting to bind non-method");

                this._bindToEntity(
                    entityKey,
                    entityKey,
                    giant.EVENT_ENTITY_CHANGE,
                    methodName,
                    'content');

                return this;
            },

            /**
             * Unsubscribes method from change events passing through the entity.
             * @param {giant.EntityKey} entityKey
             * @param {string} methodName
             * @returns {giant.EntityBound}
             */
            unbindFromEntityContentChange: function (entityKey, methodName) {
                giant
                    .isEntityKey(entityKey, "Invalid entity key")
                    .isFunction(this[methodName], "Attempting to unbind non-method");

                this._unbindFromEntity(
                    entityKey,
                    entityKey,
                    giant.EVENT_ENTITY_CHANGE,
                    methodName,
                    'content');

                return this;
            },

            /**
             * Subscribes method to be triggered only when specified entity is replaced.
             * @param {giant.EntityKey} entityKey
             * @param {string} methodName
             * @returns {giant.EntityBound}
             */
            bindToEntityChange: function (entityKey, methodName) {
                giant
                    .isEntityKey(entityKey, "Invalid entity key")
                    .isFunction(this[methodName], "Attempting to bind non-method");

                this._bindToEntity(
                    entityKey,
                    entityKey,
                    giant.EVENT_ENTITY_CHANGE,
                    methodName,
                    'strict');

                return this;
            },

            /**
             * Unsubscribes method from change events triggered on the specified entity.
             * @param {giant.EntityKey} entityKey
             * @param {string} methodName
             * @returns {giant.EntityBound}
             */
            unbindFromEntityChange: function (entityKey, methodName) {
                giant
                    .isEntityKey(entityKey, "Invalid entity key")
                    .isFunction(this[methodName], "Attempting to unbind non-method");

                this._unbindFromEntity(
                    entityKey,
                    entityKey,
                    giant.EVENT_ENTITY_CHANGE,
                    methodName,
                    'strict');

                return this;
            },

            /**
             * Subscribes method to be triggered when the specified entity or any of its parents change.
             * Adds `affectedKey` payload / property to event.
             * @param {giant.EntityKey} entityKey
             * @param {string} methodName
             * @returns {giant.EntityBound}
             */
            bindToDelegatedEntityChange: function (entityKey, methodName) {
                giant
                    .isEntityKey(entityKey, "Invalid entity key")
                    .isFunction(this[methodName], "Attempting to bind non-method");

                this._bindToEntity(
                    entityKey,
                    entityKey.documentKey,
                    giant.EVENT_ENTITY_CHANGE,
                    methodName,
                    'delegate');

                return this;
            },

            /**
             * Unsubscribes method from delegated changes.
             * @param {giant.EntityKey} entityKey
             * @param {string} methodName
             * @returns {giant.EntityBound}
             */
            unbindFromDelegatedEntityChange: function (entityKey, methodName) {
                giant
                    .isEntityKey(entityKey, "Invalid entity key")
                    .isFunction(this[methodName], "Attempting to unbind non-method");

                this._unbindFromEntity(
                    entityKey,
                    entityKey.documentKey,
                    giant.EVENT_ENTITY_CHANGE,
                    methodName,
                    'delegate');

                return this;
            },

            /**
             * Removes and unsubscribes all bindings associated with the current instance.
             * @returns {giant.EntityBound}
             */
            unbindAll: function () {
                var that = this;

                // querying all binding parameters
                this.entityBindings
                    .queryValuesAsHash('|>|>|>|'.toQuery())
                    .toCollection()
                    .forEachItem(function (bindingInfo) {
                        that._unbindFromEntity(
                            bindingInfo.targetKey,
                            bindingInfo.captureKey,
                            bindingInfo.eventName,
                            bindingInfo.methodName,
                            bindingInfo.bindingType);
                    });

                return this;
            }
        });
});
