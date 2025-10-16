import React from 'react';
export interface FormProps {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete';
}
export declare const Form: ({ url, method }: FormProps) => React.JSX.Element;
