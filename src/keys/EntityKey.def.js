/*global giant */
$oop.postpone(giant, 'EntityKey', function () {
    "use strict";

    var base = $oop.Base,
        self = base.extend()
            .addTrait(giant.Evented);

    /**
     * Creates an EntityKey instance.
     * Do not create EntityKey instances directly, only through its subclasses.
     * @name giant.EntityKey.create
     * @function
     * @returns {giant.EntityKey}
     */

    /**
     * Base class for entity keys.
     * Entity keys identify entities without relying on their actual content.
     * @class
     * @extends $oop.Base
     * @extends giant.Evented
     * @extends $utils.Stringifiable
     */
    giant.EntityKey = self
        .setEventSpace(giant.entityEventSpace)
        .setEventPath('entity'.toPath())
        .addMethods(/** @lends giant.EntityKey# */{
            /** @ignore */
            init: function () {
                giant.Evented.init.call(this);
            },

            /**
             * Fetches an attribute key based on the current key as parent and the specified attribute name.
             * @param {string} attributeName
             * @returns {giant.AttributeKey}
             */
            getAttributeKey: function (attributeName) {
                return giant.AttributeKey.create(this, attributeName);
            }
        });

    /**
     * Tells whether specified entity key is identical to the current one.
     * @name giant.EntityKey#equals
     * @function
     * @param {giant.EntityKey} key
     * @returns {boolean}
     */

    /**
     * Fetches a key to the document that contains the config information about the current entity.
     * @name giant.EntityKey#getConfigKey
     * @function
     * @returns {giant.DocumentKey}
     */

    /**
     * Resolves key to a path that points to the entity node in the cache.
     * @name giant.EntityKey#getEntityPath
     * @function
     * @returns {giant.Path}
     */
});

(function () {
    "use strict";

    $assertion.addTypes(/** @lends giant */{
        /** @param {giant.EntityKey} expr */
        isEntityKey: function (expr) {
            return giant.EntityKey.isBaseOf(expr);
        },

        /** @param {giant.EntityKey} [expr] */
        isEntityKeyOptional: function (expr) {
            return typeof expr === 'undefined' ||
                   giant.EntityKey.isBaseOf(expr);
        }
    });
}());
