import { addons, types } from '@storybook/manager-api';
import { Addon } from './src/components/Addon';
export var IDS;
(function (IDS) {
    IDS["ADDON"] = "faebeee/storybook-axios";
    IDS["PANEL"] = "storybook-axios/panel";
})(IDS || (IDS = {}));
addons.register(IDS.ADDON, () => {
    addons.add(IDS.PANEL, {
        title: 'Axios',
        type: types.PANEL,
        render: Addon,
    });
});
