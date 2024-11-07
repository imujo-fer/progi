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
// May contain unused imports in some cases
// @ts-ignore
import type { UserDTO } from './user-dto';

/**
 * 
 * @export
 * @interface TripWithCountryDTO
 */
export interface TripWithCountryDTO {
    /**
     * 
     * @type {number}
     * @memberof TripWithCountryDTO
     */
    'id': number;
    /**
     * 
     * @type {number}
     * @memberof TripWithCountryDTO
     */
    'coordinatesLat': number;
    /**
     * 
     * @type {number}
     * @memberof TripWithCountryDTO
     */
    'coordinatesLon': number;
    /**
     * 
     * @type {string}
     * @memberof TripWithCountryDTO
     */
    'city': string;
    /**
     * 
     * @type {CountryDTO}
     * @memberof TripWithCountryDTO
     */
    'country': CountryDTO;
    /**
     * 
     * @type {string}
     * @memberof TripWithCountryDTO
     */
    'datetimeFrom': string;
    /**
     * 
     * @type {string}
     * @memberof TripWithCountryDTO
     */
    'datetimeTo': string;
    /**
     * 
     * @type {string}
     * @memberof TripWithCountryDTO
     */
    'reason': string;
    /**
     * 
     * @type {UserDTO}
     * @memberof TripWithCountryDTO
     */
    'user': UserDTO;
}

