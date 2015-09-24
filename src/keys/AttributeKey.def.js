/*global giant */
giant.postpone(giant, 'AttributeKey', function () {
    "use strict";

    var base = giant.EntityKey,
        self = base.extend();

    /**
     * @name giant.AttributeKey.create
     * @function
     * @param {giant.EntityKey} parentKey Identifies the entity the attribute belongs to.
     * @param {string} attributeName Identifies the attribute relative to the parent entity.
     * @returns {giant.AttributeKey}
     */

    /**
     * @class
     * @extends giant.EntityKey
     */
    giant.AttributeKey = self
        .setEventPath(['document'].toPath().prepend(base.eventPath))
        .addMethods(/** @lends giant.AttributeKey# */{
            /**
             * @param {giant.EntityKey} parentKey
             * @param {string} attributeName
             * @ignore
             */
            init: function (parentKey, attributeName) {
                base.init.call(this);

                /**
                 * @type {giant.EntityKey}
                 */
                this.parentKey = parentKey;

                /**
                 * @type {string}
                 */
                this.attributeName = attributeName;

                this.setEventPath([attributeName].toPath().prepend(parentKey.eventPath));
            },

            /**
             * Tells whether the specified `AttributeKey` instance is equivalent to the current one.
             * @param {giant.AttributeKey} attributeKey
             * @returns {boolean}
             */
            equals: function (attributeKey) {
                return attributeKey &&
                    this.parentKey.equals(attributeKey.parentKey) &&
                    this.attributeName === attributeKey.attributeName;
            },

            /**
             * Resolves attribute key based on the parent key and attribute name.
             * @returns {giant.Path}
             */
            getEntityPath: function () {
                return this.parentKey.getEntityPath().appendKey(this.attributeName);
            }
        });
});

(function () {
    "use strict";

    $assertion.addTypes(/** @lends giant */{
        /** @param {giant.AttributeKey} expr */
        isAttributeKey: function (expr) {
            return giant.AttributeKey.isBaseOf(expr);
        },

        /** @param {giant.AttributeKey} [expr] */
        isAttributeKeyOptional: function (expr) {
            return typeof expr === 'undefined' ||
                giant.AttributeKey.isBaseOf(expr);
        }
    });
}());
