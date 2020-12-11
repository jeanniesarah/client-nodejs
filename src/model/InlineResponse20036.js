/**
 * Pipedrive API v1
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import InlineResponse20036Data from './InlineResponse20036Data';
import InlineResponse2007AdditionalData from './InlineResponse2007AdditionalData';

/**
 * The InlineResponse20036 model module.
 * @module model/InlineResponse20036
 * @version 1.0.0
 */
class InlineResponse20036 {
    /**
     * Constructs a new <code>InlineResponse20036</code>.
     * @alias module:model/InlineResponse20036
     */
    constructor() { 
        
        InlineResponse20036.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>InlineResponse20036</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InlineResponse20036} obj Optional instance to populate.
     * @return {module:model/InlineResponse20036} The populated <code>InlineResponse20036</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new InlineResponse20036();

            if (data.hasOwnProperty('success')) {
                obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
            }
            if (data.hasOwnProperty('data')) {
                obj['data'] = ApiClient.convertToType(data['data'], [InlineResponse20036Data]);
            }
            if (data.hasOwnProperty('additional_data')) {
                obj['additional_data'] = InlineResponse2007AdditionalData.constructFromObject(data['additional_data']);
            }
        }
        return obj;
    }


}

/**
 * If the request was successful or not
 * @member {Boolean} success
 */
InlineResponse20036.prototype['success'] = undefined;

/**
 * The array of Notes
 * @member {Array.<module:model/InlineResponse20036Data>} data
 */
InlineResponse20036.prototype['data'] = undefined;

/**
 * @member {module:model/InlineResponse2007AdditionalData} additional_data
 */
InlineResponse20036.prototype['additional_data'] = undefined;






export default InlineResponse20036;
