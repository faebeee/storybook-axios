import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { makeDecorator, useChannel } from 'storybook/preview-api';
import { AxiosMockHandlersConfig, EVENTS } from './types';
import serializeFormData from './utils/serialize-form-data';

export type StorybookAxiosOpts = {
  mock?: (adapter: AxiosMockAdapter) => void;
  catchAll?: boolean;
  passThrough?: boolean;
};

const interceptors: {req: number | null; res: number | null} = { req: null, res: null };

/**
 * Enhances a Storybook story by adding Axios interceptors for request and response monitoring
 * and optionally sets up mock behavior using Axios Mock Adapter.
 */
export const withStorybookAxios = (axios: AxiosInstance, opts?: StorybookAxiosOpts) => {
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

      const onReq = (request: InternalAxiosRequestConfig) => {
        const data =
          request.data instanceof FormData ? serializeFormData(request.data) : request.data;
        emit('axios-request', { ...request, data });
        return request;
      };

      const onRes = response => {
        emit('axios-response', response);
        return response;
      };

      const onResFailed = error => {
        if (error.isAxiosError === true) {
          emit('axios-response-error', error);
        }
        return Promise.reject(error);
      };

      if (!interceptors.req) {
        interceptors.req = axios.interceptors.request.use(onReq);

      }

      if (!interceptors.res) {
        interceptors.res = axios.interceptors.response.use(onRes, onResFailed);
      }

      const options: StorybookAxiosOpts = context.parameters.axios ?? opts as StorybookAxiosOpts;

      if (options) {
        const mock = new AxiosMockAdapter(axios);
        if (options.mock) {
          options.mock(mock);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          const handlers: AxiosMockHandlersConfig[] = mock.handlers.map((handler, index) => ({
            method: handler.method,
            url: handler.url,
            id: index
          }));
          emit(EVENTS.MOCK_CONFIG, handlers);
        }

        if (options?.catchAll) {
          mock.onAny().reply(501);
        }
        if (options?.passThrough) {
          mock.onAny().passThrough();
        }
      }

      return storyFn(context);
    }
  });
};