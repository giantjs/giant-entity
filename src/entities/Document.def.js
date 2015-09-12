/*global giant */
giant.postpone(giant, 'Document', function () {
    "use strict";

    var base = giant.Entity,
        self = base.extend();

    /**
     * Creates a Document instance.
     * A `Document` instance may also be created via conversion from string, array, and `DocumentKey`.
     * @name giant.Document.create
     * @function
     * @param {giant.DocumentKey} documentKey Identifies document.
     * @returns {giant.Document}
     */

    /**
     * The Document class implements an API for document nodes,
     * granting access to the document's fields and attributes.
     * @class
     * @extends giant.Entity
     */
    giant.Document = self
        .addMethods(/** @lends giant.Document# */{
            /**
             * @param {giant.DocumentKey} documentKey
             * @ignore
             */
            init: function (documentKey) {
                giant.isDocumentKey(documentKey, "Invalid document key");
                base.init.call(this, documentKey);

                /**
                 * Document key associated with current entity.
                 * @name giant.Document#entityKey
                 * @type {giant.DocumentKey}
                 */
            },

            /**
             * Fetches entity associated with the document's fields.
             * Returns self by default.
             * @returns {giant.Document}
             */
            getFieldsEntity: function () {
                return this;
            },

            /**
             * Retrieves Field entity matching the specified field name.
             * @param {string} fieldName
             * @returns {giant.Field}
             */
            getField: function (fieldName) {
                return this.entityKey.getFieldKey(fieldName).toField();
            }
        });
});

giant.amendPostponed(giant, 'Entity', function () {
    "use strict";

    giant.Entity
        .addSurrogate(giant, 'Document', function (entityKey) {
            return giant.DocumentKey.isBaseOf(entityKey);
        });
});

giant.amendPostponed(giant, 'DocumentKey', function () {
    "use strict";

    giant.DocumentKey
        .addMethods(/** @lends giant.DocumentKey */{
            /**
             * Converts `DocumentKey` to `Document`.
             * @returns {giant.Document}
             */
            toDocument: function () {
                return giant.Document.create(this);
            }
        });
});

(function () {
    "use strict";

    giant.extendBuiltIn(String.prototype, /** @lends String# */{
        /**
         * Converts `String` to `Document` instance, assuming the string is a serialized `DocumentKey`.
         * @returns {giant.Document}
         */
        toDocument: function () {
            return giant.Document.create(this.toDocumentKey());
        }
    });

    giant.extendBuiltIn(Array.prototype, /** @lends Array# */{
        /**
         * Converts `Array` to `Document` instance, assuming the array is a document key in array notation.
         * @returns {giant.Document}
         */
        toDocument: function () {
            return giant.Document.create(this.toDocumentKey());
        }
    });
}());
