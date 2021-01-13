import React, { useEffect, useState } from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { STORY_CHANGED } from '@storybook/core-events';
import { Empty } from 'antd';
import { List } from './components/List';

import 'antd/dist/antd.css';
import { TYPES } from './types';

export default () => {
    addons.register( 'faebeee/storybook-axios', (api) => {
        addons.add( 'storybook-axios/panel', {
            title: 'Axios',
            type: types.PANEL,
            render: ({ active, key }) => {
                const [entries, setEntries] = useState( [] );
                addons.getChannel().addListener( STORY_CHANGED, () => setEntries( [] ) );

                const onRequest = (data) => setEntries( [...entries, { type: TYPES.REQ, data }] );
                const onResponse = (data) => setEntries( [...entries, { type: TYPES.RES, data }] );

                useEffect( () => {
                    addons.getChannel().addListener( 'axios-request', onRequest );
                    addons.getChannel().addListener( 'axios-response', onResponse );

                    return () => {
                        addons.getChannel().removeListener( 'axios-request', onRequest );
                        addons.getChannel().removeListener( 'axios-response', onResponse );
                    }
                } );

                return (<AddonPanel active={ active } key={ key }>
                    { entries.length === 0 ? <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE }/> :
                        (<List list={ entries }/>) }
                </AddonPanel>);
            },
        } );
    } );
}
