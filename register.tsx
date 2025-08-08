import { addons, types } from '@storybook/manager-api';
import { Addon } from './src/components/Addon';

export enum IDS {
    ADDON = 'faebeee/storybook-axios',
    PANEL = 'storybook-axios/panel',
}

addons.register(IDS.ADDON, () => {
    addons.add(IDS.PANEL, {
        title: 'Axios',
        type: types.PANEL,
        render: Addon,
    });
});
