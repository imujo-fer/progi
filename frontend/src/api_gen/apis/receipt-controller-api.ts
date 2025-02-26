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
import type { Receipt } from '../models';
/**
 * ReceiptControllerApi - axios parameter creator
 * @export
 */
export const ReceiptControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getReceiptAsPdf: async (id: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getReceiptAsPdf', 'id', id)
            const localVarPath = `/api/receipts/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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
         * @param {File} file 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadReceipt: async (file: File, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'file' is not null or undefined
            assertParamExists('uploadReceipt', 'file', file)
            const localVarPath = `/api/receipts`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();


            if (file !== undefined) { 
                localVarFormParams.append('file', file as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ReceiptControllerApi - functional programming interface
 * @export
 */
export const ReceiptControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ReceiptControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getReceiptAsPdf(id: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<File>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getReceiptAsPdf(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ReceiptControllerApi.getReceiptAsPdf']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {File} file 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async uploadReceipt(file: File, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Receipt>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.uploadReceipt(file, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ReceiptControllerApi.uploadReceipt']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * ReceiptControllerApi - factory interface
 * @export
 */
export const ReceiptControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ReceiptControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {ReceiptControllerApiGetReceiptAsPdfRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getReceiptAsPdf(requestParameters: ReceiptControllerApiGetReceiptAsPdfRequest, options?: RawAxiosRequestConfig): AxiosPromise<File> {
            return localVarFp.getReceiptAsPdf(requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {ReceiptControllerApiUploadReceiptRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadReceipt(requestParameters: ReceiptControllerApiUploadReceiptRequest, options?: RawAxiosRequestConfig): AxiosPromise<Receipt> {
            return localVarFp.uploadReceipt(requestParameters.file, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for getReceiptAsPdf operation in ReceiptControllerApi.
 * @export
 * @interface ReceiptControllerApiGetReceiptAsPdfRequest
 */
export interface ReceiptControllerApiGetReceiptAsPdfRequest {
    /**
     * 
     * @type {number}
     * @memberof ReceiptControllerApiGetReceiptAsPdf
     */
    readonly id: number
}

/**
 * Request parameters for uploadReceipt operation in ReceiptControllerApi.
 * @export
 * @interface ReceiptControllerApiUploadReceiptRequest
 */
export interface ReceiptControllerApiUploadReceiptRequest {
    /**
     * 
     * @type {File}
     * @memberof ReceiptControllerApiUploadReceipt
     */
    readonly file: File
}

/**
 * ReceiptControllerApi - object-oriented interface
 * @export
 * @class ReceiptControllerApi
 * @extends {BaseAPI}
 */
export class ReceiptControllerApi extends BaseAPI {
    /**
     * 
     * @param {ReceiptControllerApiGetReceiptAsPdfRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReceiptControllerApi
     */
    public getReceiptAsPdf(requestParameters: ReceiptControllerApiGetReceiptAsPdfRequest, options?: RawAxiosRequestConfig) {
        return ReceiptControllerApiFp(this.configuration).getReceiptAsPdf(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {ReceiptControllerApiUploadReceiptRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReceiptControllerApi
     */
    public uploadReceipt(requestParameters: ReceiptControllerApiUploadReceiptRequest, options?: RawAxiosRequestConfig) {
        return ReceiptControllerApiFp(this.configuration).uploadReceipt(requestParameters.file, options).then((request) => request(this.axios, this.basePath));
    }
}

