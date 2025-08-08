import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { addons } from '@storybook/manager-api';
import { AddonPanel } from '@storybook/components';
import { STORY_CHANGED } from '@storybook/core-events';
import { Card, Col, Empty, Row, Statistic } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { EVENTS, TYPES } from '../types';
import { List } from './List';
export const Addon = ({ active }) => {
    const [entries, setEntries] = useState([]);
    const onRequest = (data) => setEntries([...entries, { type: TYPES.REQ, data }]);
    const onResponse = (data) => setEntries([...entries, { type: TYPES.RES, data }]);
    const onResponseError = (data) => setEntries([...entries, { type: TYPES.RES_ERR, data }]);
    const onStoryChanged = () => setEntries([]);
    const stats = useMemo(() => ({
        req: entries.filter((entry) => [TYPES.REQ].includes(entry.type)).length,
        res: entries.filter((entry) => [TYPES.RES].includes(entry.type)).length,
        err: entries.filter((entry) => [TYPES.RES_ERR].includes(entry.type)).length,
    }), [entries]);
    useEffect(() => {
        addons.getChannel().addListener(STORY_CHANGED, onStoryChanged);
        if (active) {
            addons.getChannel().addListener(EVENTS.REQUEST, onRequest);
            addons.getChannel().addListener(EVENTS.RESPONSE, onResponse);
            addons.getChannel().addListener(EVENTS.RESPONSE_ERROR, onResponseError);
        }
        return () => {
            addons.getChannel().removeListener(STORY_CHANGED, onStoryChanged);
            addons.getChannel().removeAllListeners(EVENTS.REQUEST);
            addons.getChannel().removeAllListeners(EVENTS.RESPONSE);
            addons.getChannel().removeAllListeners(EVENTS.RESPONSE_ERROR);
        };
    }, [onRequest, onResponse, onResponseError]);
    return (React.createElement(AddonPanel, { active: active }, entries.length === 0 ? (React.createElement(Empty, { image: Empty.PRESENTED_IMAGE_SIMPLE })) : (React.createElement(Row, { gutter: 16 },
        React.createElement(Col, { span: 4 },
            React.createElement(Card, null,
                React.createElement(Statistic, { title: "Requests", value: stats.req, valueStyle: { color: 'blue' }, prefix: React.createElement(UploadOutlined, null) })),
            React.createElement(Card, null,
                React.createElement(Statistic, { title: "Responses", value: stats.res, valueStyle: { color: 'green' }, prefix: React.createElement(DownloadOutlined, null) })),
            React.createElement(Card, null,
                React.createElement(Statistic, { title: "Errors", value: stats.err, valueStyle: { color: 'red' }, prefix: React.createElement(DownloadOutlined, null) }))),
        React.createElement(Col, { span: 20 },
            React.createElement(List, { list: entries }))))));
};
