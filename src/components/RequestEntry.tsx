import React from 'react';
import { AxiosRequestConfig } from 'axios';
import { Collapse, Divider } from 'antd';
import Title from 'antd/lib/typography/Title';

const { Panel } = Collapse;
import { UploadOutlined } from '@ant-design/icons';

export type Props = { data: AxiosRequestConfig };

export const RequestEntry = ({ data, ...rest }: Props) => {
    const title = `${ data.method.toUpperCase() } ${ data.url }`;
    return (<Panel { ...rest } header={ title } key={ data.url } extra={ <UploadOutlined/> }>
        <Title level={2}>Request</Title>
        <Divider orientation="left" plain>Headers</Divider>
        <pre className='pre'>
           { JSON.stringify( data.headers, null, 2 ) }
        </pre>

        <Divider orientation="left" plain>Data</Divider>
        <pre className='pre'>
        { JSON.stringify( data.data, null, 2 ) }
        </pre>

        <Divider orientation="left" plain>Params</Divider>
        <pre className='pre'>
        { JSON.stringify( data.params, null, 2 ) }
        </pre>
    </Panel>)
}
