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
import type { ExpenseSubcategoryDTO } from './expense-subcategory-dto';

/**
 * 
 * @export
 * @interface ExpenseReportItemInfoDTO
 */
export interface ExpenseReportItemInfoDTO {
    /**
     * 
     * @type {number}
     * @memberof ExpenseReportItemInfoDTO
     */
    'id': number;
    /**
     * 
     * @type {number}
     * @memberof ExpenseReportItemInfoDTO
     */
    'receiptId': number;
    /**
     * 
     * @type {ExpenseSubcategoryDTO}
     * @memberof ExpenseReportItemInfoDTO
     */
    'expenseSubcategory': ExpenseSubcategoryDTO;
    /**
     * 
     * @type {string}
     * @memberof ExpenseReportItemInfoDTO
     */
    'description': string;
    /**
     * 
     * @type {string}
     * @memberof ExpenseReportItemInfoDTO
     */
    'currency': ExpenseReportItemInfoDTOCurrencyEnum;
    /**
     * 
     * @type {number}
     * @memberof ExpenseReportItemInfoDTO
     */
    'currencyValue': number;
    /**
     * 
     * @type {number}
     * @memberof ExpenseReportItemInfoDTO
     */
    'eurValue': number;
}

export const ExpenseReportItemInfoDTOCurrencyEnum = {
    Eur: 'EUR',
    Usd: 'USD',
    Gbp: 'GBP',
    Other: 'OTHER'
} as const;

export type ExpenseReportItemInfoDTOCurrencyEnum = typeof ExpenseReportItemInfoDTOCurrencyEnum[keyof typeof ExpenseReportItemInfoDTOCurrencyEnum];


