import React from 'react';
import type { AxiosResponse } from 'axios';
import { Divider } from 'antd';
import Title from 'antd/lib/typography/Title';

export type Props = { data: AxiosResponse };

export const ResponseEntry = ({ data }: Props) => {
    console.log(data);
    return (
        <>
            <Title level={2}>Response</Title>
            <pre className="pre">{data.config.url}</pre>

            <Divider orientation="left" plain>
                Headers
            </Divider>
            <pre className="pre">{JSON.stringify(data.headers, null, 2)}</pre>

            <Divider orientation="left" plain>
                Data
            </Divider>
            <pre className="pre">{JSON.stringify(data.data, null, 2)}</pre>
        </>
    );
};
