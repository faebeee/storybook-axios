import type { AxiosInstance } from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { makeDecorator, useChannel } from 'storybook/preview-api';
import serializeFormData from './utils/serialize-form-data';

export type StorybookAxiosOpts = {
    mock?: (adapter: AxiosMockAdapter) => void
}

/**
 * Enhances a Storybook story by adding Axios interceptors for request and response monitoring
 * and optionally sets up mock behavior using Axios Mock Adapter.
 *
 * @param {AxiosInstance} axios - The Axios instance to which interceptors will be attached.
 * @param {StorybookAxiosOpts} [opts] - Optional configuration for the Storybook Axios integration.
 *   - `mock`: A function that accepts an Axios Mock Adapter instance for customizing mock behavior.
 *
 * @returns {Function} A Storybook decorator that wraps stories with Axios monitoring and optional mocking capabilities.
 */
export const withStorybookAxios = (axios: AxiosInstance, opts?: StorybookAxiosOpts) => {
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
                const data =
                    request.data instanceof FormData
                        ? serializeFormData(request.data)
                        : request.data;
                emit('axios-request', { ...request, data });
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

            if (opts?.mock) {
                const mock = new AxiosMockAdapter(axios);
                opts.mock(mock);
            }

            return storyFn(context);
        }
    });
};