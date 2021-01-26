import React from 'react';
import { addons, types } from '@storybook/addons';
import { Addon } from './src/components/Addon';

import 'antd/dist/antd.css';

export enum IDS {
    ADDON = 'faebeee/storybook-axios',
    PANEL = 'storybook-axios/panel',
}

addons.register( IDS.ADDON, (api) => {
    addons.add( IDS.PANEL, {
        title: `Axios`,
        type: types.PANEL,
        render: ({ active, key }) => {
            return (<Addon active={ active } key={ key }/>);
        },
    } );
} );
