import type { AxiosRequestConfig } from 'axios';
import React from 'react';
export interface PageProps {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete';
    config?: AxiosRequestConfig;
}
export declare const Page: ({ url, method, config }: PageProps) => React.JSX.Element;
