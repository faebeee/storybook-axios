import { addons, types } from 'storybook/manager-api';
import { Addon } from './components/Addon';

export enum IDS {
  ADDON = 'faebeee/storybook-axios',
  PANEL = 'storybook-axios/panel',
}

addons.register(IDS.ADDON, () => {
  addons.add(IDS.PANEL, {
    title: 'Axios',
    type: types.PANEL,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    render: Addon
  });
});
