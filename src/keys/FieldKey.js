/*global giant, giant, giant, giant */
giant.postpone(giant, 'FieldKey', function () {
    "use strict";

    var base = giant.EntityKey,
        self = base.extend();

    /**
     * Creates FieldKey instance.
     * FieldKey instances may also be created via conversion from string or array.
     * @name giant.FieldKey.create
     * @function
     * @param {string} documentType Identifies type of document the field belongs to.
     * @param {string} documentId Identifies document (within document type) the field belongs to.
     * @param {string} fieldName Identifies field (within document).
     * @returns {giant.FieldKey}
     */

    /**
     * The FieldKey class identifies a field entity nodes in the cache.
     * @class
     * @extends giant.EntityKey
     */
    giant.FieldKey = self
        .setEventPath(['document'].toPath().prepend(base.eventPath))
        .addMethods(/** @lends giant.FieldKey# */{
            /**
             * @param {string} documentType
             * @param {string} documentId
             * @param {string} fieldName
             * @ignore
             */
            init: function (documentType, documentId, fieldName) {
                base.init.call(this);

                /**
                 * Document key reference.
                 * @type {giant.DocumentKey}
                 */
                this.documentKey = giant.DocumentKey.create(documentType, documentId);

                /**
                 * Name of current field.
                 * @type {string}
                 */
                this.fieldName = fieldName;

                this.setEventPath([fieldName].toPath().prepend(this.documentKey.eventPath));
            },

            /**
             * Tells whether current field key is equivalent to the specified one.
             * @param {giant.FieldKey} fieldKey
             * @returns {boolean}
             */
            equals: function (fieldKey) {
                return fieldKey &&
                    this.documentKey.equals(fieldKey.documentKey) &&
                    this.fieldName === fieldKey.fieldName;
            },

            /**
             * Fetches key to config document that describes the current field.
             * @returns {giant.DocumentKey}
             */
            getConfigKey: function () {
                var documentId = [this.documentKey.documentType, this.fieldName].toDocumentKey().toString();
                return ['field', documentId].toDocumentKey();
            },

            /**
             * Creates an `ItemKey` instance based on the current field key and the specified item ID.
             * @param {string} itemId
             * @returns {giant.ItemKey}
             */
            getItemKey: function (itemId) {
                var documentKey = this.documentKey;

                return giant.ItemKey.create(
                    documentKey.documentType,
                    documentKey.documentId,
                    this.fieldName,
                    itemId
                );
            },

            /**
             * Determines absolute path to the field node identified by the current key.
             * In case field node sits on a different path relative to the document node
             * for a certain `documentType` / `fieldName` combination,
             * subclass `FieldKey` and override `.getEntityPath()` to reflect the correct path.
             * @returns {giant.Path}
             */
            getEntityPath: function () {
                return this.documentKey
                    .getEntityPath()
                    .appendKey(String(this.fieldName));
            },

            /**
             * Retrieves the field type associated with the current field from the config datastore.
             * @returns {string}
             * @see giant.config
             */
            getFieldType: function () {
                var field = this.getConfigKey().getFieldKey('fieldType');
                return giant.config.getNode(field.getEntityPath());
            },

            /**
             * Retrieves item type string for the item entity identified by the current key.
             * @returns {string}
             */
            getItemType: function () {
                var field = this.getConfigKey().getFieldKey('itemType');
                return giant.config.getNode(field.getEntityPath());
            },

            /**
             * Retrieves item type string for the item entity identified by the current key.
             * @returns {string}
             */
            getItemIdType: function () {
                var field = this.getConfigKey().getFieldKey('itemIdType');
                return giant.config.getNode(field.getEntityPath());
            },

            /**
             * Serializes current field key.
             * @example
             * giant.FieldKey.create('user', '1234', 'name').toString() // "user/1234/name"
             * @returns {string}
             */
            toString: function () {
                return this.documentKey.toString() + '/' +
                    giant.StringUtils.escapeChars(this.fieldName, '/');
            }
        });
});

(function () {
    "use strict";

    giant.addTypes(/** @lends giant */{
        /** @param {giant.FieldKey} expr */
        isFieldKey: function (expr) {
            return giant.FieldKey.isBaseOf(expr);
        },

        /** @param {giant.FieldKey} expr */
        isFieldKeyStrict: function (expr) {
            return giant.FieldKey.isBaseOf(expr) &&
                expr.getBase() === giant.FieldKey;
        },

        /** @param {giant.FieldKey} [expr] */
        isFieldKeyOptional: function (expr) {
            return typeof expr === 'undefined' ||
                giant.FieldKey.isBaseOf(expr);
        }
    });

    giant.Properties.addProperties.call(
        String.prototype,
        /** @lends String# */{
            /**
             * Converts `String` to a `FieldKey`. Assumes that string is a serialized `FieldKey`.
             * @returns {giant.FieldKey}
             */
            toFieldKey: function () {
                var StringUtils = giant.StringUtils,
                    parts = StringUtils.safeSplit(this, '/'),
                    documentType = parts[0],
                    documentId = parts[1],
                    fieldName = parts[2];

                return typeof documentType === 'string' &&
                    typeof documentId === 'string' &&
                    typeof fieldName === 'string' ?
                    giant.FieldKey.create(
                        StringUtils.unescapeChars(documentType, '/'),
                        StringUtils.unescapeChars(documentId, '/'),
                        StringUtils.unescapeChars(fieldName, '/')) :
                    undefined;
            }
        },
        false, false, false
    );

    giant.Properties.addProperties.call(
        Array.prototype,
        /** @lends Array# */{
            /**
             * Converts `Array` (of strings) to a `FieldKey` instance.
             * Assumes that array is a field key in array notation.
             * @returns {giant.FieldKey}
             */
            toFieldKey: function () {
                var documentType = this[0],
                    documentId = this[1],
                    fieldName = this[2];

                return typeof documentType !== 'undefined' &&
                    typeof documentId !== 'undefined' &&
                    typeof fieldName !== 'undefined' ?
                    giant.FieldKey.create(documentType, documentId, fieldName) :
                    undefined;
            }
        },
        false, false, false
    );
}());
