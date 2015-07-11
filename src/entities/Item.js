/*global giant, giant, giant, giant */
giant.postpone(giant, 'Item', function () {
    "use strict";

    var base = giant.Field,
        self = base.extend();

    /**
     * Creates an Item instance.
     * @name giant.Item.create
     * @function
     * @param {giant.ItemKey} itemKey
     * @returns {giant.Item}
     */

    /**
     * The Item class implements an API for collection item nodes in the cache.
     * @class
     * @extends giant.Field
     */
    giant.Item = self
        .addMethods(/** @lends giant.Item# */{
            /**
             * @param {giant.ItemKey} itemKey
             * @ignore
             */
            init: function (itemKey) {
                giant.isItemKey(itemKey, "Invalid item key");

                base.init.call(this, itemKey);

                /**
                 * Item key associated with current entity.
                 * @name giant.Item#entityKey
                 * @type {giant.ItemKey}
                 */
            },

            /**
             * Fetches attribute entity that holds the items the current item belongs to.
             * @returns {giant.Entity}
             */
            getParentEntity: function () {
                return this.entityKey.getFieldKey().toField()
                    .getValueEntity();
            }
        });
});

giant.amendPostponed(giant, 'Entity', function () {
    "use strict";

    giant.Entity
        .addSurrogate(giant, 'Item', function (entityKey) {
            return entityKey.isA(giant.ItemKey);
        });
});

giant.amendPostponed(giant, 'ItemKey', function () {
    "use strict";

    giant.ItemKey
        .addMethods(/** @lends giant.ItemKey */{
            /**
             * Creates Item instance based on the current item key.
             * @returns {giant.Item}
             */
            toItem: function () {
                return giant.Item.create(this);
            }
        });
});

(function () {
    "use strict";

    giant.Properties.addProperties.call(
        String.prototype,
        /** @lends String# */{
            /**
             * Converts `String` to `Item` instance, assuming the string is a serialized `ItemKey`.
             * @returns {giant.Item}
             */
            toItem: function () {
                return giant.Item.create(this.toItemKey());
            }
        },
        false, false, false
    );

    giant.Properties.addProperties.call(
        Array.prototype,
        /** @lends Array# */{
            /**
             * Converts `Array` to `Item` instance, assuming the array is an item key in array notation.
             * @returns {giant.Item}
             */
            toItem: function () {
                return giant.Item.create(this.toItemKey());
            }
        },
        false, false, false
    );
}());
