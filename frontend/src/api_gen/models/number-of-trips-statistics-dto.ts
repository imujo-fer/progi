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



/**
 * 
 * @export
 * @interface NumberOfTripsStatisticsDTO
 */
export interface NumberOfTripsStatisticsDTO {
    /**
     * 
     * @type {string}
     * @memberof NumberOfTripsStatisticsDTO
     */
    'month': NumberOfTripsStatisticsDTOMonthEnum;
    /**
     * 
     * @type {number}
     * @memberof NumberOfTripsStatisticsDTO
     */
    'numberOfTrips': number;
}

export const NumberOfTripsStatisticsDTOMonthEnum = {
    January: 'JANUARY',
    February: 'FEBRUARY',
    March: 'MARCH',
    April: 'APRIL',
    May: 'MAY',
    June: 'JUNE',
    July: 'JULY',
    August: 'AUGUST',
    September: 'SEPTEMBER',
    October: 'OCTOBER',
    November: 'NOVEMBER',
    December: 'DECEMBER'
} as const;

export type NumberOfTripsStatisticsDTOMonthEnum = typeof NumberOfTripsStatisticsDTOMonthEnum[keyof typeof NumberOfTripsStatisticsDTOMonthEnum];


