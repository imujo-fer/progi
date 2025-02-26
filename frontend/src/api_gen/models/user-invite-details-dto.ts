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
import type { Department } from './department';

/**
 * 
 * @export
 * @interface UserInviteDetailsDTO
 */
export interface UserInviteDetailsDTO {
    /**
     * 
     * @type {number}
     * @memberof UserInviteDetailsDTO
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof UserInviteDetailsDTO
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof UserInviteDetailsDTO
     */
    'firstName': string;
    /**
     * 
     * @type {string}
     * @memberof UserInviteDetailsDTO
     */
    'lastName': string;
    /**
     * 
     * @type {string}
     * @memberof UserInviteDetailsDTO
     */
    'iban': string;
    /**
     * 
     * @type {Department}
     * @memberof UserInviteDetailsDTO
     */
    'department': Department;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserInviteDetailsDTO
     */
    'roles': Array<UserInviteDetailsDTORolesEnum>;
}

export const UserInviteDetailsDTORolesEnum = {
    Employee: 'EMPLOYEE',
    Accountant: 'ACCOUNTANT',
    DepartmentHead: 'DEPARTMENT_HEAD',
    Director: 'DIRECTOR',
    Administrator: 'ADMINISTRATOR'
} as const;

export type UserInviteDetailsDTORolesEnum = typeof UserInviteDetailsDTORolesEnum[keyof typeof UserInviteDetailsDTORolesEnum];


