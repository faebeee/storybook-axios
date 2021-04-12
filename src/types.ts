import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export enum TYPES {
    REQ = 'request',
    RES = 'response',
    RES_ERR = 'response_error',
}

export enum EVENTS {
    REQUEST = 'axios-request',
    RESPONSE = 'axios-response',
    RESPONSE_ERROR = 'axios-response-error',
    UPDATE_COUNT = 'axios-update-count',
    UPDATE_RESPONSE_OVERWRITE = 'axios-update-response-OVERWRITE',
}

export type ListEntry = {
    type: TYPES,
    data: AxiosResponse | AxiosRequestConfig | AxiosError;
}
