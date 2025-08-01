import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import React from 'react';

import { type ListEntry, TYPES } from '../types';
import { RequestEntry } from './RequestEntry';
import { ResponseEntry } from './ResponseEntry';
import { ResponseErrorEntry } from './ResponseErrorEntry';

export type ListProps = { list: ListEntry[] };

export const List = ({ list }: ListProps) => {
    const items = list.map((entry, idx) => {
        const key = String(idx);

        switch (entry.type) {
            case TYPES.REQ:
                return {
                    key,
                    label: `${entry.data.method?.toUpperCase()} ${entry.data.url}`,
                    children: <RequestEntry data={entry.data} />,
                    extra: <UploadOutlined style={{ color: 'blue' }} />,
                };
            case TYPES.RES:
                return {
                    key,
                    children: <ResponseEntry data={entry.data} />,
                    label: `${entry.data.status} ${entry.data.config.url}`,
                    extra: <DownloadOutlined style={{ color: 'green' }} />,
                };
            case TYPES.RES_ERR:
                return {
                    key,
                    label: `ERR ${entry.data.config?.url}`,
                    children: <ResponseErrorEntry data={entry.data} />,
                    extra: <DownloadOutlined style={{ color: 'red' }} />,
                };
        }
    });

    return <Collapse items={items} />;
};
