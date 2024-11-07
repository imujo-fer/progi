/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import type { CountryDTO } from './country-dto';

/**
 * 
 * @export
 * @interface TripNotificationDTO
 */
export interface TripNotificationDTO {
    /**
     * 
     * @type {number}
     * @memberof TripNotificationDTO
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof TripNotificationDTO
     */
    'requestNumber': string;
    /**
     * 
     * @type {string}
     * @memberof TripNotificationDTO
     */
    'dateFrom': string;
    /**
     * 
     * @type {string}
     * @memberof TripNotificationDTO
     */
    'dateTo': string;
    /**
     * 
     * @type {string}
     * @memberof TripNotificationDTO
     */
    'city': string;
    /**
     * 
     * @type {CountryDTO}
     * @memberof TripNotificationDTO
     */
    'country': CountryDTO;
}

