import { makeDecorator, useChannel } from '@storybook/addons';
import { AxiosInstance } from 'axios';
import { EVENTS } from './types';
import serializeFormData from './utils/serialize-form-data';

export const withStorybookAxios = (axios: AxiosInstance) => {
    const interceptors = { req: null, res: null, responseCode: null };

    return makeDecorator( {
        name: 'withAxios',
        parameterName: 'axios',
        wrapper: (storyFn, context, data) => {
            const emit = useChannel( {
                [EVENTS.UPDATE_RESPONSE_CODE]: (code) => interceptors.responseCode = code,
            } );

            if (interceptors.req !== null) {
                axios.interceptors.request.eject( interceptors.req );
                interceptors.req = null;
            }

            if (interceptors.res !== null) {
                axios.interceptors.response.eject( interceptors.res );
                interceptors.res = null;
            }

            const onReq = (request) => {
                const data = request.data instanceof FormData ? serializeFormData( request.data ) : request.data;

                if (interceptors.responseCode) {
                    request.validateStatus = () => {
                        return interceptors.responseCode >= 200 && interceptors.responseCode < 300;
                    }
                }

                emit( 'axios-request', { ...request, data } );
                return request;
            }

            const onRes = (response) => {
                if (interceptors.responseCode) {
                    response.status = interceptors.responseCode;
                }
                emit( 'axios-response', response );
                return response;
            }

            const onResFailed = (error) => {
                if (error.isAxiosError === true) {
                    if (interceptors.responseCode) {
                        error.response.status = interceptors.responseCode;
                    }
                    emit( 'axios-response-error', error );
                }
                return Promise.reject( error );
            }

            interceptors.req = axios.interceptors.request.use( onReq );
            interceptors.res = axios.interceptors.response.use( onRes, onResFailed );

            return storyFn( context );
        },
    } );
}

export default withStorybookAxios;
