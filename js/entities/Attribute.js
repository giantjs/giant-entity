/*global giant, giant, giant, giant */
giant.postpone(giant, 'Attribute', function () {
    "use strict";

    var base = giant.Entity,
        self = base.extend();

    /**
     * Creates a Attribute instance.
     * @name giant.Attribute.create
     * @function
     * @param {giant.AttributeKey} documentKey Identifies document.
     * @returns {giant.Attribute}
     */

    /**
     * The Attribute class implements an API for attribute nodes.
     * Attribute nodes hold custom information about the entity they are associated with.
     * @class
     * @extends giant.Entity
     */
    giant.Attribute = self
        .addMethods(/** @lends giant.Attribute# */{
            /**
             * @param {giant.AttributeKey} attributeKey
             * @ignore
             */
            init: function (attributeKey) {
                giant.isAttributeKey(attributeKey, "Invalid attribute key");
                base.init.call(this, attributeKey);

                /**
                 * Attribute key associated with current entity.
                 * @name giant.Attribute#entityKey
                 * @type {giant.AttributeKey}
                 */
            },

            /**
             * Fetches entity the current attribute belongs to.
             * @returns {giant.Entity}
             */
            getParentEntity: function () {
                return this.entityKey.parentKey.toEntity();
            }
        });
});

giant.amendPostponed(giant, 'Entity', function () {
    "use strict";

    giant.Entity
        .addSurrogate(giant, 'Attribute', function (entityKey) {
            return giant.AttributeKey.isBaseOf(entityKey);
        });
});

giant.amendPostponed(giant, 'AttributeKey', function () {
    "use strict";

    giant.AttributeKey
        .addMethods(/** @lends giant.AttributeKey */{
            /**
             * Converts `AttributeKey` to `Attribute`.
             * @returns {giant.Attribute}
             */
            toAttribute: function () {
                return giant.Attribute.create(this);
            }
        });
});
