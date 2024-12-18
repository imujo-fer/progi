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
import type { ExpenseSubcategory } from "./expense-subcategory";

/**
 *
 * @export
 * @interface ExpenseReportItemWithSubcategoryDTO
 */
export interface ExpenseReportItemWithSubcategoryDTO {
  /**
   *
   * @type {number}
   * @memberof ExpenseReportItemWithSubcategoryDTO
   */
  id: number;
  /**
   *
   * @type {number}
   * @memberof ExpenseReportItemWithSubcategoryDTO
   */
  expenseReportId: number;
  /**
   *
   * @type {number}
   * @memberof ExpenseReportItemWithSubcategoryDTO
   */
  receiptId: number;
  /**
   *
   * @type {ExpenseSubcategory}
   * @memberof ExpenseReportItemWithSubcategoryDTO
   */
  expenseSubcategory: ExpenseSubcategory;
  /**
   *
   * @type {string}
   * @memberof ExpenseReportItemWithSubcategoryDTO
   */
  description: string;
  /**
   *
   * @type {string}
   * @memberof ExpenseReportItemWithSubcategoryDTO
   */
  currency: ExpenseReportItemWithSubcategoryDTOCurrencyEnum;
  /**
   *
   * @type {number}
   * @memberof ExpenseReportItemWithSubcategoryDTO
   */
  currencyValue: number;
  /**
   *
   * @type {number}
   * @memberof ExpenseReportItemWithSubcategoryDTO
   */
  eurValue: number;
}

export const ExpenseReportItemWithSubcategoryDTOCurrencyEnum = {
  Eur: "EUR",
  Usd: "USD",
  Gbp: "GBP",
  Other: "OTHER",
} as const;

export type ExpenseReportItemWithSubcategoryDTOCurrencyEnum =
  (typeof ExpenseReportItemWithSubcategoryDTOCurrencyEnum)[keyof typeof ExpenseReportItemWithSubcategoryDTOCurrencyEnum];
