import withAxiosDecorator from '../dist/src/decorator';
import { getAxios } from '../utils/get-axios';

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [withAxiosDecorator(getAxios())];
