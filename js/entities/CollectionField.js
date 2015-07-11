/*global giant, giant, giant, giant */
giant.postpone(giant, 'CollectionField', function () {
    "use strict";

    var base = giant.Field,
        self = base.extend();

    /**
     * Creates a CollectionField instance.
     * CollectionField instances may be created via `giant.Field.create` provided that the `config` cache defines
     * the field type as 'collection'.
     * @name giant.CollectionField.create
     * @function
     * @param {giant.FieldKey} fieldKey Identifies collection field.
     * @returns {giant.CollectionField}
     */

    /**
     * The CollectionField class implements an API for composite document fields, granting access to items.
     * @class
     * @extends giant.Field
     */
    giant.CollectionField = self
        .addMethods(/** @lends giant.CollectionField# */{
            /**
             * Fetches node from cache containing the collection items.
             * @returns {object}
             */
            getItems: function () {
                return this.getValue();
            },

            /**
             * Fetches items node wrapped in a `Collection` instance.
             * @returns {giant.Collection}
             */
            getItemsAsCollection: function () {
                return giant.Collection.create(this.getValue());
            },

            /**
             * Retrieves `Item` entity matching the specified item ID.
             * @param {string} itemId
             * @returns {giant.Item}
             */
            getItem: function (itemId) {
                return this.entityKey.getItemKey(itemId).toItem();
            },

            /**
             * Retrieves an item key for the item matching the specified value.
             * @param {*} value
             * @returns {giant.ItemKey}
             */
            getItemKeyByValue: function (value) {
                var item = this.getItemByValue(value);
                return item && item.entityKey;
            },

            /**
             * Retrieves an Item instance for the item matching the specified value.
             * Iterates ove all items. Avoid using it for large collections.
             * TODO: Implement indexed version.
             * @param {*} value
             * @returns {giant.Item}
             */
            getItemByValue: function (value) {
                var result,
                    itemsNode = this.getItems(),
                    itemIds,
                    i, item;

                if (itemsNode) {
                    itemIds = Object.keys(itemsNode);
                    for (i = 0; i < itemIds.length; i++) {
                        item = this.getItem(itemIds[i]);
                        if (item.getValue() === value) {
                            result = item;
                            break;
                        }
                    }
                }

                return result;
            }
        });
});

giant.amendPostponed(giant, 'Field', function () {
    "use strict";

    giant.Field
        .addSurrogate(giant, 'CollectionField', function (/**giant.FieldKey*/fieldKey) {
            return fieldKey.getFieldType() === 'collection';
        });
});
