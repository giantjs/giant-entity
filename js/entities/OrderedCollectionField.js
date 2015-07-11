/*global giant, giant, giant, giant */
giant.postpone(giant, 'OrderedCollectionField', function () {
    "use strict";

    var base = giant.CollectionField,
        self = base.extend();

    /**
     * Creates an OrderedCollectionField instance.
     * OrderedCollectionField instances may be created via `giant.Field.create` provided that the `config`
     * cache defines the field type as 'ordered-collection'.
     * @name giant.OrderedCollectionField.create
     * @function
     * @param {string} fieldKey Identifies ordered collection field.
     * @returns {giant.OrderedCollectionField}
     */

    /**
     * The OrderedCollectionField class defines an API for collections the items of which are in a pre-defined order.
     * Provides methods for accessing information about item order, as well as retrieving items based on order.
     * @class
     * @extends giant.CollectionField
     */
    giant.OrderedCollectionField = self
        .addMethods(/** @lends giant.OrderedCollectionField# */{
            /**
             * Fetches item order for specified item ID.
             * TODO: Add more tests.
             * @param {string} itemId
             * @returns {number}
             */
            getItemOrder: function (itemId) {
                var itemKey = this.entityKey.getItemKey(itemId),
                    item = itemKey.toItem();

                return item.getAttribute('order').getNode() ||
                       item.getValue();
            },

            /**
             * Retrieves `ItemKey` from collection matching the specified order.
             * @param {number} order
             * @returns {giant.ItemKey}
             */
            getItemKeyByOrder: function (order) {
                var item = this.getItemByOrder(order);
                return item && item.entityKey;
            },

            /**
             * Retrieves `Item` entity from collection matching the specified order.
             * Iterates ove all items. Avoid using it for large collections.
             * TODO: Implement indexed version.
             * @param {number} order
             * @returns {giant.Item}
             */
            getItemByOrder: function (order) {
                var result,
                    itemsNode = this.getItems(),
                    itemIds,
                    i, itemId;

                if (itemsNode) {
                    itemIds = Object.keys(itemsNode);
                    for (i = 0; i < itemIds.length; i++) {
                        itemId = itemIds[i];
                        if (this.getItemOrder(itemId) === order) {
                            result = this.getItem(itemId);
                            break;
                        }
                    }
                }

                return result;
            },

            /**
             * Retrieves highest item order from collection.
             * @returns {number}
             */
            getMaxOrder: function () {
                var result = Number.MIN_VALUE,
                    itemsNode = this.getItems(),
                    itemIds,
                    i, itemId, itemOrder;

                if (itemsNode) {
                    itemIds = Object.keys(itemsNode);
                    for (i = 0; i < itemIds.length; i++) {
                        itemId = itemIds[i];
                        itemOrder = this.getItemOrder(itemId);
                        if (itemOrder > result) {
                            result = itemOrder;
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
        .addSurrogate(giant, 'OrderedCollectionField', function (/**giant.FieldKey*/fieldKey) {
            return fieldKey.getFieldType() === 'ordered-collection';
        });
});
