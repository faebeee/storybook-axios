import { AxiosRequestConfig, AxiosResponse } from 'axios';

export enum TYPES {
    REQ = 'request',
    RES = 'response',
}

export type ListEntry = {
    type: TYPES,
    data: AxiosResponse | AxiosRequestConfig;
}
