import { useChannel } from '@storybook/addons';
import { makeDecorator } from '@storybook/preview-api';
import serializeFormData from './utils/serialize-form-data';
export const withStorybookAxios = (axios) => {
    const interceptors = { req: null, res: null };
    return makeDecorator({
        name: 'withAxios',
        parameterName: 'axios',
        wrapper: (storyFn, context) => {
            const emit = useChannel({});
            if (interceptors.req !== null) {
                axios.interceptors.request.eject(interceptors.req);
                interceptors.req = null;
            }
            if (interceptors.res !== null) {
                axios.interceptors.response.eject(interceptors.res);
                interceptors.res = null;
            }
            const onReq = (request) => {
                const data = request.data instanceof FormData
                    ? serializeFormData(request.data)
                    : request.data;
                emit('axios-request', Object.assign(Object.assign({}, request), { data }));
                return request;
            };
            const onRes = (response) => {
                emit('axios-response', response);
                return response;
            };
            const onResFailed = (error) => {
                if (error.isAxiosError === true) {
                    emit('axios-response-error', error);
                }
                return Promise.reject(error);
            };
            interceptors.req = axios.interceptors.request.use(onReq);
            interceptors.res = axios.interceptors.response.use(onRes, onResFailed);
            return storyFn(context);
        },
    });
};
export default withStorybookAxios;
