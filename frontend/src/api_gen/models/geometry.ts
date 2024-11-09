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
import type { Bounds } from './bounds';
// May contain unused imports in some cases
// @ts-ignore
import type { LatLng } from './lat-lng';

/**
 * 
 * @export
 * @interface Geometry
 */
export interface Geometry {
    /**
     * 
     * @type {Bounds}
     * @memberof Geometry
     */
    'bounds'?: Bounds;
    /**
     * 
     * @type {LatLng}
     * @memberof Geometry
     */
    'location'?: LatLng;
    /**
     * 
     * @type {string}
     * @memberof Geometry
     */
    'locationType'?: GeometryLocationTypeEnum;
    /**
     * 
     * @type {Bounds}
     * @memberof Geometry
     */
    'viewport'?: Bounds;
}

export const GeometryLocationTypeEnum = {
    Rooftop: 'ROOFTOP',
    RangeInterpolated: 'RANGE_INTERPOLATED',
    GeometricCenter: 'GEOMETRIC_CENTER',
    Approximate: 'APPROXIMATE',
    Unknown: 'UNKNOWN'
} as const;

export type GeometryLocationTypeEnum = typeof GeometryLocationTypeEnum[keyof typeof GeometryLocationTypeEnum];


