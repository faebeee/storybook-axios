import React from 'react';
import { AxiosResponse } from 'axios';
import { Collapse, Divider } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';

const { Panel } = Collapse;

export type Props = { data: AxiosResponse };

export const ResponseEntry = ({ data, ...rest }: Props) => {
    const title = `${ data.status } ${ data.config.url }`;
    return (<Panel { ...rest } header={ title } key={ data.config.url } extra={ <DownloadOutlined/> }>
        <Title level={2}>Response</Title>
        <Divider orientation="left" plain>Headers</Divider>
        <pre className='pre'>
        { JSON.stringify( data.headers, null, 2 ) }
        </pre>


        <Divider orientation="left" plain>Data</Divider>
        <pre className='pre'>
        { JSON.stringify( data.data, null, 2 ) }
        </pre>
    </Panel>)
}
