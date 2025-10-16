import React from 'react';
import { addons, types } from 'storybook/manager-api';
import { Addon } from './components/Addon';

export enum IDS {
    ADDON = 'faebeee/storybook-axios',
    PANEL = 'storybook-axios/panel',
}

addons.register(IDS.ADDON, () => {
    console.log('register')
    addons.add(IDS.PANEL, {
        title: 'Axios',
        type: types.PANEL,
        render: ({ active, key }) => {
            console.log('render', active)
            return <Addon active={active} key={key} />;
        },
    });
});
