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
import type { NotificationDTO } from '../models';
// @ts-ignore
import type { TripStatus } from '../models';
// @ts-ignore
import type { TripStatusDTO } from '../models';
/**
 * TripStatusControllerApi - axios parameter creator
 * @export
 */
export const TripStatusControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {TripStatusDTO} tripStatusDTO 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTripStatus: async (tripStatusDTO: TripStatusDTO, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tripStatusDTO' is not null or undefined
            assertParamExists('createTripStatus', 'tripStatusDTO', tripStatusDTO)
            const localVarPath = `/api/trip-statuses`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(tripStatusDTO, localVarRequestOptions, configuration)

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
        getNotifications: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/trip-statuses/notifications`;
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
    }
};

/**
 * TripStatusControllerApi - functional programming interface
 * @export
 */
export const TripStatusControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TripStatusControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {TripStatusDTO} tripStatusDTO 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createTripStatus(tripStatusDTO: TripStatusDTO, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TripStatus>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createTripStatus(tripStatusDTO, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['TripStatusControllerApi.createTripStatus']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getNotifications(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<NotificationDTO>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getNotifications(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['TripStatusControllerApi.getNotifications']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * TripStatusControllerApi - factory interface
 * @export
 */
export const TripStatusControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TripStatusControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {TripStatusControllerApiCreateTripStatusRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTripStatus(requestParameters: TripStatusControllerApiCreateTripStatusRequest, options?: RawAxiosRequestConfig): AxiosPromise<TripStatus> {
            return localVarFp.createTripStatus(requestParameters.tripStatusDTO, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getNotifications(options?: RawAxiosRequestConfig): AxiosPromise<Array<NotificationDTO>> {
            return localVarFp.getNotifications(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createTripStatus operation in TripStatusControllerApi.
 * @export
 * @interface TripStatusControllerApiCreateTripStatusRequest
 */
export interface TripStatusControllerApiCreateTripStatusRequest {
    /**
     * 
     * @type {TripStatusDTO}
     * @memberof TripStatusControllerApiCreateTripStatus
     */
    readonly tripStatusDTO: TripStatusDTO
}

/**
 * TripStatusControllerApi - object-oriented interface
 * @export
 * @class TripStatusControllerApi
 * @extends {BaseAPI}
 */
export class TripStatusControllerApi extends BaseAPI {
    /**
     * 
     * @param {TripStatusControllerApiCreateTripStatusRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TripStatusControllerApi
     */
    public createTripStatus(requestParameters: TripStatusControllerApiCreateTripStatusRequest, options?: RawAxiosRequestConfig) {
        return TripStatusControllerApiFp(this.configuration).createTripStatus(requestParameters.tripStatusDTO, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TripStatusControllerApi
     */
    public getNotifications(options?: RawAxiosRequestConfig) {
        return TripStatusControllerApiFp(this.configuration).getNotifications(options).then((request) => request(this.axios, this.basePath));
    }
}

