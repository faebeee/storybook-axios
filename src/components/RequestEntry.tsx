import React from 'react';
import type { AxiosRequestConfig } from 'axios';
import { Divider } from 'antd';
import Title from 'antd/lib/typography/Title';

export type Props = { data: AxiosRequestConfig };

export const RequestEntry = ({ data }: Props) => {
    return (
        <>
            <Title level={2}>Request</Title>

            <Divider orientation="left" plain>
                Headers
            </Divider>
            <pre className="pre">{JSON.stringify(data.headers, null, 2)}</pre>

            <Divider orientation="left" plain>
                Data
            </Divider>
            <pre className="pre">{JSON.stringify(data.data, null, 2)}</pre>

            <Divider orientation="left" plain>
                Params
            </Divider>
            <pre className="pre">{JSON.stringify(data.params, null, 2)}</pre>
        </>
    );
};
