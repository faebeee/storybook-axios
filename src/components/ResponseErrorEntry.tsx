import { DownloadOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { AxiosError } from 'axios';
import React from 'react';

const { Panel } = Collapse;

export type Props = { data: AxiosError };

export const ResponseErrorEntry = ({ data, ...rest }: Props) => {
    const title = `ERR ${ data.config.url }`;
    return (
        <Panel { ...rest } header={ title } key={ data.config.url }
               extra={ <DownloadOutlined style={ { color: 'red' } }/> }>
            <pre className="pre">
            { data.message }
            </pre>

            <pre className="pre">
            { data.response?.data }
            </pre>
        </Panel>
    );
}
