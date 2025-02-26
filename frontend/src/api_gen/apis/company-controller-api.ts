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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, type RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import type { Company } from '../models';
// @ts-ignore
import type { CompanyDetailsDTO } from '../models';
// @ts-ignore
import type { UpdateCompanyDTO } from '../models';
/**
 * CompanyControllerApi - axios parameter creator
 * @export
 */
export const CompanyControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCompanyDetails: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/company`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCompanyDetailsWithDailyWages: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/company/settings`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {UpdateCompanyDTO} updateCompanyDTO 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateCompanySettings: async (updateCompanyDTO: UpdateCompanyDTO, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'updateCompanyDTO' is not null or undefined
            assertParamExists('updateCompanySettings', 'updateCompanyDTO', updateCompanyDTO)
            const localVarPath = `/api/company/settings`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateCompanyDTO, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CompanyControllerApi - functional programming interface
 * @export
 */
export const CompanyControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CompanyControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCompanyDetails(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Company>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCompanyDetails(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['CompanyControllerApi.getCompanyDetails']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCompanyDetailsWithDailyWages(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CompanyDetailsDTO>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCompanyDetailsWithDailyWages(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['CompanyControllerApi.getCompanyDetailsWithDailyWages']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {UpdateCompanyDTO} updateCompanyDTO 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateCompanySettings(updateCompanyDTO: UpdateCompanyDTO, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Company>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateCompanySettings(updateCompanyDTO, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['CompanyControllerApi.updateCompanySettings']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * CompanyControllerApi - factory interface
 * @export
 */
export const CompanyControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CompanyControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCompanyDetails(options?: RawAxiosRequestConfig): AxiosPromise<Company> {
            return localVarFp.getCompanyDetails(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCompanyDetailsWithDailyWages(options?: RawAxiosRequestConfig): AxiosPromise<CompanyDetailsDTO> {
            return localVarFp.getCompanyDetailsWithDailyWages(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {CompanyControllerApiUpdateCompanySettingsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateCompanySettings(requestParameters: CompanyControllerApiUpdateCompanySettingsRequest, options?: RawAxiosRequestConfig): AxiosPromise<Company> {
            return localVarFp.updateCompanySettings(requestParameters.updateCompanyDTO, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for updateCompanySettings operation in CompanyControllerApi.
 * @export
 * @interface CompanyControllerApiUpdateCompanySettingsRequest
 */
export interface CompanyControllerApiUpdateCompanySettingsRequest {
    /**
     * 
     * @type {UpdateCompanyDTO}
     * @memberof CompanyControllerApiUpdateCompanySettings
     */
    readonly updateCompanyDTO: UpdateCompanyDTO
}

/**
 * CompanyControllerApi - object-oriented interface
 * @export
 * @class CompanyControllerApi
 * @extends {BaseAPI}
 */
export class CompanyControllerApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CompanyControllerApi
     */
    public getCompanyDetails(options?: RawAxiosRequestConfig) {
        return CompanyControllerApiFp(this.configuration).getCompanyDetails(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CompanyControllerApi
     */
    public getCompanyDetailsWithDailyWages(options?: RawAxiosRequestConfig) {
        return CompanyControllerApiFp(this.configuration).getCompanyDetailsWithDailyWages(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {CompanyControllerApiUpdateCompanySettingsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CompanyControllerApi
     */
    public updateCompanySettings(requestParameters: CompanyControllerApiUpdateCompanySettingsRequest, options?: RawAxiosRequestConfig) {
        return CompanyControllerApiFp(this.configuration).updateCompanySettings(requestParameters.updateCompanyDTO, options).then((request) => request(this.axios, this.basePath));
    }
}

