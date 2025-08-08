import withAxiosDecorator from '../';
import { getAxios } from '../utils/get-axios';

/** @type { import('@storybook/react').Preview } */
const preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
    },
    decorators: [withAxiosDecorator(getAxios())],
};

export default preview;
