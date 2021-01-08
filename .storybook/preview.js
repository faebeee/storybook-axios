import withAxiosDecorator from '../';
import { getAxios } from '../utils/get-axios';

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [withAxiosDecorator(getAxios())];
