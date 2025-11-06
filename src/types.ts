import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

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
  MOCK_CONFIG = 'axios-mock-config',
}

export type ListEntry =
    | { type: TYPES.RES_ERR; data: AxiosError }
    | { type: TYPES.REQ; data: AxiosRequestConfig }
    | { type: TYPES.RES; data: AxiosResponse };


export type AxiosMockHandlersConfig = {
  method: string;
  url: string;
  id: number;
};