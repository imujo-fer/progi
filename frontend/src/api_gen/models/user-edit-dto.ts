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
 * @interface UserEditDTO
 */
export interface UserEditDTO {
    /**
     * 
     * @type {string}
     * @memberof UserEditDTO
     */
    'firstName': string;
    /**
     * 
     * @type {string}
     * @memberof UserEditDTO
     */
    'lastName': string;
    /**
     * 
     * @type {string}
     * @memberof UserEditDTO
     */
    'iban': string;
    /**
     * 
     * @type {number}
     * @memberof UserEditDTO
     */
    'departmentId': number;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserEditDTO
     */
    'roles': Array<UserEditDTORolesEnum>;
}

export const UserEditDTORolesEnum = {
    Employee: 'EMPLOYEE',
    Accountant: 'ACCOUNTANT',
    DepartmentHead: 'DEPARTMENT_HEAD',
    Director: 'DIRECTOR'
} as const;

export type UserEditDTORolesEnum = typeof UserEditDTORolesEnum[keyof typeof UserEditDTORolesEnum];

