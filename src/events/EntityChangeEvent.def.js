/*global giant */
$oop.postpone(giant, 'EntityChangeEvent', function () {
    "use strict";

    var base = giant.Event,
        self = base.extend();

    /**
     * Instantiates class.
     * @name giant.EntityChangeEvent.create
     * @param {string} eventName Event name
     * @param {giant.EventSpace} eventSpace Event space associated with event
     * @function
     * @returns {giant.EntityChangeEvent}
     */

    /**
     * @class
     * @extends giant.Event
     */
    giant.EntityChangeEvent = self
        .addMethods(/** @lends giant.EntityChangeEvent# */{
            /**
             * @param {string} eventName
             * @param {giant.EventSpace} eventSpace
             * @ignore
             */
            init: function (eventName, eventSpace) {
                base.init.call(this, eventName, eventSpace);

                /**
                 * Node value before change.
                 * @type {*}
                 */
                this.beforeNode = undefined;

                /**
                 * Node value after change.
                 * @type {*}
                 */
                this.afterNode = undefined;

                /**
                 * Identifies the node that changed if it is different from the observed key.
                 * @type {giant.EntityKey}
                 */
                this.affectedKey = undefined;
            },

            /**
             * Clones entity change event.
             * @param {$data.Path} [currentPath]
             * @returns {giant.Event}
             */
            clone: function (currentPath) {
                return base.clone.call(this, currentPath)
                    .setBeforeNode(this.beforeNode)
                    .setAfterNode(this.afterNode);
            },

            /**
             * Sets event load before the change.
             * @param {*} value
             * @returns {giant.EntityChangeEvent}
             */
            setBeforeNode: function (value) {
                this.beforeNode = value;
                return this;
            },

            /**
             * Sets event load after the change.
             * @param {*} value
             * @returns {giant.EntityChangeEvent}
             */
            setAfterNode: function (value) {
                this.afterNode = value;
                return this;
            },

            /**
             * Sets key identifying changed node.
             * @param {giant.EntityKey} affectedKey
             * @returns {giant.EntityChangeEvent}
             */
            setAffectedKey: function (affectedKey) {
                this.affectedKey = affectedKey;
                return this;
            },

            /**
             * Tells whether change event represents an insert.
             * @returns {boolean}
             */
            isInsert: function () {
                return typeof this.beforeNode === 'undefined' &&
                       typeof this.afterNode !== 'undefined';
            },

            /**
             * Tells whether change event represents a deletion.
             * @returns {boolean}
             */
            isDelete: function () {
                return typeof this.beforeNode !== 'undefined' &&
                       typeof this.afterNode === 'undefined';
            }
        });
});

$oop.amendPostponed(giant, 'Event', function () {
    "use strict";

    giant.Event.addSurrogate(giant, 'EntityChangeEvent', function (eventName) {
        var prefix = 'entity.change';
        return eventName.substr(0, prefix.length) === prefix;
    });
});

(function () {
    "use strict";

    $assertion.addTypes(/** @lends giant */{
        /**
         * @param {giant.EntityChangeEvent} expr
         */
        isEntityChangeEvent: function (expr) {
            return giant.EntityChangeEvent.isBaseOf(expr);
        },

        /**
         * @param {giant.EntityChangeEvent} expr
         */
        isEntityChangeEventOptional: function (expr) {
            return typeof expr === 'undefined' ||
                   giant.EntityChangeEvent.isBaseOf(expr);
        }
    });
}());
