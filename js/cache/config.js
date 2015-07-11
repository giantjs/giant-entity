/*global giant, giant, giant, giant */
giant.postpone(giant, 'config', function () {
    "use strict";

    /**
     * Contains meta-entities describing document types and their fields.
     * @type {giant.Tree}
     */
    giant.config = giant.Tree.create({
        document: {
            document: {
            },

            field: {
                //                /** Sample config documents. */
                //                'user/name'   : {
                //                    /** Field contains string */
                //                    fieldType: 'string'
                //                },
                //                'user/age'    : {
                //                    /** Field contains number */
                //                    fieldType: 'number'
                //                },
                //                'user/emails' : {
                //                    /** Field contains collection */
                //                    fieldType: 'collection',
                //                    /** Items are strings */
                //                    itemType : 'string'
                //                },
                //                'user/friends': {
                //                    /** Field contains collection */
                //                    fieldType : 'collection',
                //                    /** Items are booleans */
                //                    itemType  : 'boolean',
                //                    /** Item IDs are references */
                //                    itemIdType: 'reference'
                //                }
            }
        }
    });
});
