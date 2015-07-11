/*global giant, giant, giant, giant */
giant.postpone(giant, 'DocumentKey', function () {
    "use strict";

    var base = giant.EntityKey,
        self = base.extend();

    /**
     * Creates a DocumentKey instance.
     * DocumentKey instances may also be created via conversion from string or array.
     * @name giant.DocumentKey.create
     * @function
     * @param {string} documentType Identifies document type.
     * @param {string} documentId Identifies document in the context of its document type.
     * @returns {giant.DocumentKey}
     */

    /**
     * The DocumentKey class identifies document nodes in the cache.
     * @class
     * @extends giant.EntityKey
     */
    giant.DocumentKey = self
        .setEventPath(['document'].toPath().prepend(base.eventPath))
        .addMethods(/** @lends giant.DocumentKey# */{
            /**
             * @param {string} documentType
             * @param {string} documentId
             * @ignore
             */
            init: function (documentType, documentId) {
                base.init.call(this);

                /**
                 * Document type.
                 * @type {string}
                 */
                this.documentType = documentType;

                /**
                 * Document identifier.
                 * @type {string}
                 */
                this.documentId = documentId;

                this.setEventPath([documentType, documentId].toPath().prepend(this.eventPath));
            },

            /**
             * Tells whether the specified `DocumentKey` instance is equivalent to the current one.
             * @param {giant.DocumentKey} documentKey
             * @returns {boolean}
             */
            equals: function (documentKey) {
                return documentKey &&
                    this.documentType === documentKey.documentType &&
                    this.documentId === documentKey.documentId;
            },

            /**
             * Fetches a document key to the
             * @returns {giant.DocumentKey}
             */
            getConfigKey: function () {
                return ['document', this.documentType].toDocumentKey();
            },

            /**
             * Determines absolute path to the entity node of the document identified by the current key.
             * In case document node sits on a different path for a certain `documentType`,
             * subclass `DocumentKey` and override `.getEntityPath()` to reflect the correct path.
             * @returns {giant.Path}
             */
            getEntityPath: function () {
                return ['document', String(this.documentType), String(this.documentId)].toPath();
            },

            /**
             * Creates a `FieldKey` instance based on the current document key and the specified field name.
             * @param {string} fieldName
             * @returns {giant.FieldKey}
             */
            getFieldKey: function (fieldName) {
                return giant.FieldKey.create(
                    this.documentType,
                    this.documentId,
                    fieldName
                );
            },

            /**
             * Serializes current document key.
             * @example
             * giant.DocumentKey.create('user', '1234').toString() // "user/1234"
             * @returns {string}
             */
            toString: function () {
                var StringUtils = giant.StringUtils;
                return StringUtils.escapeChars(this.documentType, '/') + '/' +
                    StringUtils.escapeChars(this.documentId, '/');
            }
        });
});

(function () {
    "use strict";

    giant.addTypes(/** @lends giant */{
        /** @param {giant.DocumentKey} expr */
        isDocumentKey: function (expr) {
            return giant.DocumentKey.isBaseOf(expr);
        },

        /** @param {giant.DocumentKey} [expr] */
        isDocumentKeyOptional: function (expr) {
            return typeof expr === 'undefined' ||
                giant.DocumentKey.isBaseOf(expr);
        }
    });

    giant.Properties.addProperties.call(
        String.prototype,
        /** @lends String# */{
            /**
             * Converts `String` to a `DocumentKey` instance. Assumes string is a serialized document key.
             * @returns {giant.DocumentKey}
             */
            toDocumentKey: function () {
                var StringUtils = giant.StringUtils,
                    parts = StringUtils.safeSplit(this, '/'),
                    documentType = parts[0],
                    documentId = parts[1];

                return typeof documentType === 'string' && typeof documentId === 'string' ?
                    giant.DocumentKey.create(
                        StringUtils.unescapeChars(documentType, '/'),
                        StringUtils.unescapeChars(documentId, '/')) :
                    undefined;
            }
        },
        false, false, false);

    giant.Properties.addProperties.call(
        Array.prototype,
        /** @lends Array# */{
            /**
             * Converts `Array` (of strings) to a `DocumentKey` instance.
             * Assumes array is a document key in array notation.
             * @returns {giant.DocumentKey}
             * @example
             * ['foo', 'bar'].toDocumentKey() // single document key
             */
            toDocumentKey: function () {
                var documentType = this[0],
                    documentId = this[1];

                return typeof documentType !== 'undefined' && typeof documentId !== 'undefined' ?
                    giant.DocumentKey.create(documentType, documentId) :
                    undefined;
            }
        },
        false, false, false);
}());
