import { ArrowDownOutlined, ArrowUpOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { addons } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { STORY_CHANGED } from '@storybook/core-events';
import { Card, Col, Empty, Row, Space, Statistic } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { EVENTS, TYPES } from '../types';
import { List } from './List';

export type Props = {
    active: boolean;
}

export const Addon = ({ active }: Props) => {
    const [entries, setEntries] = useState( [] );
    const onRequest = (data) => setEntries( [...entries, { type: TYPES.REQ, data }] );
    const onResponse = (data) => setEntries( [...entries, { type: TYPES.RES, data }] );
    const onResponseError = (data) => setEntries( [...entries, { type: TYPES.RES_ERR, data }] );
    const onStoryChanged = () => setEntries( [] );

    const stats = useMemo( () => ({
        req: entries.filter( entry => [TYPES.REQ].includes( entry.type ) ).length,
        res: entries.filter( entry => [TYPES.RES].includes( entry.type ) ).length,
        err: entries.filter( entry => [TYPES.RES_ERR].includes( entry.type ) ).length,
    }), [entries] );

    useEffect( () => {
        addons.getChannel().addListener( STORY_CHANGED, onStoryChanged );

        if (active) {
            addons.getChannel().addListener( EVENTS.REQUEST, onRequest );
            addons.getChannel().addListener( EVENTS.RESPONSE, onResponse );
            addons.getChannel().addListener( EVENTS.RESPONSE_ERROR, onResponseError );
        }

        return () => {
            addons.getChannel().removeListener( STORY_CHANGED, onStoryChanged );
            addons.getChannel().removeAllListeners( EVENTS.REQUEST );
            addons.getChannel().removeAllListeners( EVENTS.RESPONSE );
            addons.getChannel().removeAllListeners( EVENTS.RESPONSE_ERROR );
        }
    }, [onRequest, onResponse, onResponseError] );

    return (<AddonPanel active={ active }>
        { entries.length === 0 ? <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE }/> :
            (<Row gutter={ 16 }>
                <Col span={ 4 }>
                    <Card>
                        <Statistic
                            title="Requests"
                            value={ stats.req }
                            valueStyle={ { color: 'blue' } }
                            prefix={ <UploadOutlined/> }/>
                    </Card>
                    <Card>
                        <Statistic
                            title="Responses"
                            value={ stats.res }
                            valueStyle={ { color: 'green' } }
                            prefix={ <DownloadOutlined/> }/>
                    </Card>
                    <Card>
                        <Statistic
                            title="Errors"
                            value={ stats.err }
                            valueStyle={ { color: 'red' } }
                            prefix={ <DownloadOutlined/> }/>
                    </Card>
                </Col>
                <Col span={ 20 }>
                    <List list={ entries }/>
                </Col>
            </Row>) }
    </AddonPanel>);
}
