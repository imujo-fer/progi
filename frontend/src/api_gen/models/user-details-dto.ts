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
 * @interface UserDetailsDTO
 */
export interface UserDetailsDTO {
    /**
     * 
     * @type {number}
     * @memberof UserDetailsDTO
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof UserDetailsDTO
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof UserDetailsDTO
     */
    'firstName': string;
    /**
     * 
     * @type {string}
     * @memberof UserDetailsDTO
     */
    'lastName': string;
    /**
     * 
     * @type {string}
     * @memberof UserDetailsDTO
     */
    'iban': string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserDetailsDTO
     */
    'roles'?: Array<UserDetailsDTORolesEnum>;
    /**
     * 
     * @type {Department}
     * @memberof UserDetailsDTO
     */
    'department'?: Department;
}

export const UserDetailsDTORolesEnum = {
    Employee: 'EMPLOYEE',
    Accountant: 'ACCOUNTANT',
    DepartmentHead: 'DEPARTMENT_HEAD',
    Director: 'DIRECTOR',
    Administrator: 'ADMINISTRATOR'
} as const;

export type UserDetailsDTORolesEnum = typeof UserDetailsDTORolesEnum[keyof typeof UserDetailsDTORolesEnum];


