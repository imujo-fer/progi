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
import type { Trip } from './trip';

/**
 * 
 * @export
 * @interface TripStatus
 */
export interface TripStatus {
    /**
     * 
     * @type {number}
     * @memberof TripStatus
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof TripStatus
     */
    'status': TripStatusStatusEnum;
    /**
     * 
     * @type {Trip}
     * @memberof TripStatus
     */
    'trip'?: Trip;
    /**
     * 
     * @type {string}
     * @memberof TripStatus
     */
    'message'?: string;
    /**
     * 
     * @type {string}
     * @memberof TripStatus
     */
    'createdAt': string;
}

export const TripStatusStatusEnum = {
    PendingDepartmentApproval: 'PENDING_DEPARTMENT_APPROVAL',
    DepartmentApprovalRejected: 'DEPARTMENT_APPROVAL_REJECTED',
    TravelApproved: 'TRAVEL_APPROVED',
    PendingExpenseApproval: 'PENDING_EXPENSE_APPROVAL',
    ExpenseApprovalRejected: 'EXPENSE_APPROVAL_REJECTED',
    PendingDirectorApproval: 'PENDING_DIRECTOR_APPROVAL',
    DirectorApprovalRejected: 'DIRECTOR_APPROVAL_REJECTED',
    AwaitingPayment: 'AWAITING_PAYMENT',
    Paid: 'PAID'
} as const;

export type TripStatusStatusEnum = typeof TripStatusStatusEnum[keyof typeof TripStatusStatusEnum];


