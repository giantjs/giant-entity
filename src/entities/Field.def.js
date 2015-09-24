/*global giant */
$oop.postpone(giant, 'Field', function () {
    "use strict";

    var base = giant.Entity,
        self = base.extend();

    /**
     * Creates a Field instance.
     * @name giant.Field.create
     * @function
     * @param {giant.FieldKey} fieldKey
     * @returns {giant.Field}
     */

    /**
     * The Field entity class implements an API for document field nodes in the cache. Allows access and modification
     * of the field's value and attributes.
     * @class
     * @extends giant.Entity
     * @extends giant.Stringifiable
     */
    giant.Field = self
        .addMethods(/** @lends giant.Field# */{
            /**
             * @param {giant.FieldKey} fieldKey
             * @ignore
             */
            init: function (fieldKey) {
                $assertion.isFieldKey(fieldKey, "Invalid field key");

                base.init.call(this, fieldKey);

                /**
                 * Field key associated with current entity.
                 * @name giant.Field#entityKey
                 * @type {giant.FieldKey}
                 */
            },

            /**
             * Fetches fields entity from the document the current field belongs to.
             * @returns {giant.Entity}
             */
            getParentEntity: function () {
                return this.entityKey.documentKey.toDocument()
                    .getFieldsEntity();
            },

            /**
             * Fetches entity associated with the field's value.
             * Returns self by default.
             * @returns {giant.Entity}
             */
            getValueEntity: function () {
                return this;
            },

            /**
             * Fetches field value node from cache.
             * Identical to the node by default.
             * @returns {*}
             */
            getValue: function () {
                return this.getValueEntity().getNode();
            },

            /**
             * Fetches field value node from cache without triggering access events.
             * @returns {*}
             */
            getSilentValue: function () {
                return this.getValueEntity().getSilentNode();
            },

            /**
             * Sets field value node to the specified value.
             * @param {*} value
             * @returns {giant.Field}
             */
            setValue: function (value) {
                this.getValueEntity().setNode(value);
                return this;
            },

            /**
             * Returns the stringified value of the field.
             * @returns {string}
             */
            toString: function () {
                return giant.Stringifier.stringify(this.getValue());
            }
        });
});

$oop.amendPostponed(giant, 'Entity', function () {
    "use strict";

    giant.Entity
        .addSurrogate(giant, 'Field', function (entityKey) {
            return entityKey.instanceOf(giant.FieldKey);
        });
});

$oop.amendPostponed(giant, 'FieldKey', function () {
    "use strict";

    giant.FieldKey
        .addMethods(/** @lends giant.FieldKey */{
            /**
             * Converts `FieldKey` to `Field`.
             * @returns {giant.Field}
             */
            toField: function () {
                return giant.Field.create(this);
            }
        });
});

(function () {
    "use strict";

    $oop.extendBuiltIn(String.prototype, /** @lends String# */{
        /**
         * Converts `String` to `Field` instance, assuming the string is a serialized `FieldKey`.
         * @returns {giant.Field}
         */
        toField: function () {
            return giant.Field.create(this.toFieldKey());
        }
    });

    $oop.extendBuiltIn(Array.prototype, /** @lends Array# */{
        /**
         * Converts `Array` to `Field` instance, assuming the array is a field key in array notation.
         * @returns {giant.Field}
         */
        toField: function () {
            return giant.Field.create(this.toFieldKey());
        }
    });
}());
