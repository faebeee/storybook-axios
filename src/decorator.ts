import { makeDecorator, useChannel } from '@storybook/addons';
import { AxiosInstance } from 'axios';
import serializeFormData from './utils/serialize-form-data';

export const decorator = (axios: AxiosInstance) => {
    const interceptors = { req: null, res: null };

    return makeDecorator( {
        name: 'withAxios',
        parameterName: 'axios',
        wrapper: (storyFn, context, data) => {
            const emit = useChannel( {} );

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
                emit( 'axios-request', { ...request, data } );
                return request;
            }

            const onRes = (response) => {
                emit( 'axios-response', response );
                return response;
            }

            interceptors.req = axios.interceptors.request.use( onReq );
            interceptors.res = axios.interceptors.response.use( onRes );

            return storyFn( context );
        },
    } );
}
