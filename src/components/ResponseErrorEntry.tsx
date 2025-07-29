import React from 'react';
import type { AxiosError } from 'axios';
import { Collapse } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

export type Props = { data: AxiosError };

export const ResponseErrorEntry = ({ data, ...rest }: Props) => {
    const title = `ERR ${ data.config.url }`;
    return (
        <Panel { ...rest } header={ title } key={ data.config.url } extra={ <DownloadOutlined style={{color: 'red'}}/> }>
            <pre className='pre'>
            { data.message }
            </pre>
        </Panel>
    );
}
