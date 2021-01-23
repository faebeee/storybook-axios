import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { STORY_CHANGED } from '@storybook/core-events';
import { API } from '@storybook/api';
import { Empty } from 'antd';
import { List } from './src/components/List';

import 'antd/dist/antd.css';
import { TYPES, EVENTS } from './src/types';
import { createTitleListener } from './src/utils/create-title-listener';

export enum IDS {
    ADDON = 'faebeee/storybook-axios',
    PANEL = 'storybook-axios/panel',
}

addons.register( IDS.ADDON, (api) => {
    addons.add( IDS.PANEL, {
        title: createTitleListener( api ),
        type: types.PANEL,
        render: ({ active, key }) => {
            const [entries, setEntries] = useState( [] );
            const onRequest = (data) => setEntries( [...entries, { type: TYPES.REQ, data }] );
            const onResponse = (data) => setEntries( [...entries, { type: TYPES.RES, data }] );
            const onResponseError = (data) => setEntries( [...entries, { type: TYPES.RES_ERR, data }] );
            let interval = null;

            const notifyEntryChanges = () => addons.getChannel().emit( EVENTS.UPDATE_COUNT, {
                entries,
            } );

            useEffect( () => {
                interval = setInterval( notifyEntryChanges, 1000 );
                addons.getChannel().addListener( STORY_CHANGED, () => setEntries( [] ) );
                addons.getChannel().addListener( EVENTS.REQUEST, onRequest );
                addons.getChannel().addListener( EVENTS.RESPONSE, onResponse );
                addons.getChannel().addListener( EVENTS.RESPONSE_ERROR, onResponseError );

                return () => {
                    clearInterval( interval );
                    addons.getChannel().removeListener( STORY_CHANGED, () => setEntries( [] ) );
                    addons.getChannel().removeListener( EVENTS.REQUEST, onRequest );
                    addons.getChannel().removeListener( EVENTS.RESPONSE, onResponse );
                    addons.getChannel().removeListener( EVENTS.RESPONSE_ERROR, onResponseError );
                }
            } );

            return (<AddonPanel active={ active } key={ key }>
                { entries.length === 0 ? <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE }/> :
                    (<List list={ entries }/>) }
            </AddonPanel>);
        },
    } );
} );
