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
/**
 * HnbProxyControllerApi - axios parameter creator
 * @export
 */
export const HnbProxyControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} currency 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getExchangeRates: async (currency: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'currency' is not null or undefined
            assertParamExists('getExchangeRates', 'currency', currency)
            const localVarPath = `/exchange-rates/{currency}`
                .replace(`{${"currency"}}`, encodeURIComponent(String(currency)));
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
 * HnbProxyControllerApi - functional programming interface
 * @export
 */
export const HnbProxyControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = HnbProxyControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} currency 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getExchangeRates(currency: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getExchangeRates(currency, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['HnbProxyControllerApi.getExchangeRates']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * HnbProxyControllerApi - factory interface
 * @export
 */
export const HnbProxyControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = HnbProxyControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {HnbProxyControllerApiGetExchangeRatesRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getExchangeRates(requestParameters: HnbProxyControllerApiGetExchangeRatesRequest, options?: RawAxiosRequestConfig): AxiosPromise<string> {
            return localVarFp.getExchangeRates(requestParameters.currency, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for getExchangeRates operation in HnbProxyControllerApi.
 * @export
 * @interface HnbProxyControllerApiGetExchangeRatesRequest
 */
export interface HnbProxyControllerApiGetExchangeRatesRequest {
    /**
     * 
     * @type {string}
     * @memberof HnbProxyControllerApiGetExchangeRates
     */
    readonly currency: string
}

/**
 * HnbProxyControllerApi - object-oriented interface
 * @export
 * @class HnbProxyControllerApi
 * @extends {BaseAPI}
 */
export class HnbProxyControllerApi extends BaseAPI {
    /**
     * 
     * @param {HnbProxyControllerApiGetExchangeRatesRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HnbProxyControllerApi
     */
    public getExchangeRates(requestParameters: HnbProxyControllerApiGetExchangeRatesRequest, options?: RawAxiosRequestConfig) {
        return HnbProxyControllerApiFp(this.configuration).getExchangeRates(requestParameters.currency, options).then((request) => request(this.axios, this.basePath));
    }
}

