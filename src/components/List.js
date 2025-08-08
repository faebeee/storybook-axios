import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import React from 'react';
import { TYPES } from '../types';
import { RequestEntry } from './RequestEntry';
import { ResponseEntry } from './ResponseEntry';
import { ResponseErrorEntry } from './ResponseErrorEntry';
export const List = ({ list }) => {
    const items = list.map((entry, idx) => {
        var _a, _b;
        const key = String(idx);
        switch (entry.type) {
            case TYPES.REQ:
                return {
                    key,
                    label: `${(_a = entry.data.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()} ${entry.data.url}`,
                    children: React.createElement(RequestEntry, { data: entry.data }),
                    extra: React.createElement(UploadOutlined, { style: { color: 'blue' } }),
                };
            case TYPES.RES:
                return {
                    key,
                    children: React.createElement(ResponseEntry, { data: entry.data }),
                    label: `${entry.data.status} ${entry.data.config.url}`,
                    extra: React.createElement(DownloadOutlined, { style: { color: 'green' } }),
                };
            case TYPES.RES_ERR:
                return {
                    key,
                    label: `ERR ${(_b = entry.data.config) === null || _b === void 0 ? void 0 : _b.url}`,
                    children: React.createElement(ResponseErrorEntry, { data: entry.data }),
                    extra: React.createElement(DownloadOutlined, { style: { color: 'red' } }),
                };
        }
    });
    return React.createElement(Collapse, { items: items });
};
