/*global giant */
$oop.postpone(giant, 'DocumentKeyCollection', function () {
    "use strict";

    /**
     * Creates a DocumentKeyCollection instance.
     * @name giant.DocumentKeyCollection.create
     * @function
     * @param {object} [items]
     * @returns {giant.DocumentKeyCollection}
     */

    /**
     * The DocumentKeyCollection offers a simplified way of dealing with multiple document keys.
     * TODO: Add tests.
     * @example
     * // retrieves a collection of `Document` instances based on the specified document keys
     * ['user/1234', 'user/4321'].toDocumentKeyCollection().toDocument();
     * @class
     * @extends {$data.Collection}
     * @extends {giant.DocumentKey}
     */
    giant.DocumentKeyCollection = $data.Collection.of(giant.DocumentKey);
});

$oop.amendPostponed($data, 'Hash', function () {
    "use strict";

    $data.Hash
        .addMethods(/** @lends $data.Hash */{
            /**
             * Converts `Hash` instance to `DocumentKeyCollection` instance.
             * @returns {giant.DocumentKeyCollection}
             */
            toDocumentKeyCollection: function () {
                return giant.DocumentKeyCollection.create(this.items);
            }
        });
});

(function () {
    "use strict";

    $oop.extendBuiltIn(Array.prototype, /** @lends Array# */{
        /**
         * Converts `Array` (of `DocumentKey` instances) to a `DocumentKeyCollection` instance.
         * @returns {giant.DocumentKeyCollection}
         * @example
         * ['foo/bar', 'foo/baz'].toDocumentKeyCollection() // collection of document keys
         */
        toDocumentKeyCollection: function () {
            return this
                .toCollection()
                .callOnEachItem('toDocumentKey')
                .toDocumentKeyCollection();
        }
    });
}());
