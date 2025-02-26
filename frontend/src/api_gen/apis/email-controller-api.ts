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
 * EmailControllerApi - axios parameter creator
 * @export
 */
export const EmailControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} to 
         * @param {string} subject 
         * @param {string} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sendEmail: async (to: string, subject: string, body: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'to' is not null or undefined
            assertParamExists('sendEmail', 'to', to)
            // verify required parameter 'subject' is not null or undefined
            assertParamExists('sendEmail', 'subject', subject)
            // verify required parameter 'body' is not null or undefined
            assertParamExists('sendEmail', 'body', body)
            const localVarPath = `/send-email`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (to !== undefined) {
                localVarQueryParameter['to'] = to;
            }

            if (subject !== undefined) {
                localVarQueryParameter['subject'] = subject;
            }

            if (body !== undefined) {
                localVarQueryParameter['body'] = body;
            }


    
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
 * EmailControllerApi - functional programming interface
 * @export
 */
export const EmailControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = EmailControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} to 
         * @param {string} subject 
         * @param {string} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sendEmail(to: string, subject: string, body: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sendEmail(to, subject, body, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['EmailControllerApi.sendEmail']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * EmailControllerApi - factory interface
 * @export
 */
export const EmailControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = EmailControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {EmailControllerApiSendEmailRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sendEmail(requestParameters: EmailControllerApiSendEmailRequest, options?: RawAxiosRequestConfig): AxiosPromise<string> {
            return localVarFp.sendEmail(requestParameters.to, requestParameters.subject, requestParameters.body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for sendEmail operation in EmailControllerApi.
 * @export
 * @interface EmailControllerApiSendEmailRequest
 */
export interface EmailControllerApiSendEmailRequest {
    /**
     * 
     * @type {string}
     * @memberof EmailControllerApiSendEmail
     */
    readonly to: string

    /**
     * 
     * @type {string}
     * @memberof EmailControllerApiSendEmail
     */
    readonly subject: string

    /**
     * 
     * @type {string}
     * @memberof EmailControllerApiSendEmail
     */
    readonly body: string
}

/**
 * EmailControllerApi - object-oriented interface
 * @export
 * @class EmailControllerApi
 * @extends {BaseAPI}
 */
export class EmailControllerApi extends BaseAPI {
    /**
     * 
     * @param {EmailControllerApiSendEmailRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmailControllerApi
     */
    public sendEmail(requestParameters: EmailControllerApiSendEmailRequest, options?: RawAxiosRequestConfig) {
        return EmailControllerApiFp(this.configuration).sendEmail(requestParameters.to, requestParameters.subject, requestParameters.body, options).then((request) => request(this.axios, this.basePath));
    }
}

