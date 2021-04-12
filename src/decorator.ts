import { makeDecorator, useChannel } from '@storybook/addons';
import { AxiosInstance } from 'axios';
import { EVENTS } from './types';
import serializeFormData from './utils/serialize-form-data';

export const withStorybookAxios = (axios: AxiosInstance) => {
    const interceptors = { req: null, res: null, responseOverwrite: { code: null, response: null } };

    return makeDecorator( {
        name: 'withAxios',
        parameterName: 'axios',
        wrapper: (storyFn, context, data) => {
            const emit = useChannel( {
                [EVENTS.UPDATE_RESPONSE_OVERWRITE]: (settings) => {
                    // Reset
                    !settings && (interceptors.responseOverwrite = { code: null, response: null });

                    // update values
                    !!settings?.code && (interceptors.responseOverwrite.code = parseInt( settings.code ));
                    !!settings?.response && (interceptors.responseOverwrite.response = settings.response);
                },
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

                if (interceptors.responseOverwrite.code) {

                }

                emit( EVENTS.REQUEST, { ...request, data } );
                return request;
            }

            const mutateResponse = (response) => {
                if (interceptors.responseOverwrite.code) {
                    response.status = interceptors.responseOverwrite.code;
                }
                if (interceptors.responseOverwrite.response) {
                    response.data = JSON.parse( interceptors.responseOverwrite.response );
                }
            }

            const onRes = (response) => {
                mutateResponse( response );
                emit( EVENTS.RESPONSE, response );
                return response;
            }

            const onResFailed = (error) => {
                if (error.isAxiosError === true) {
                    mutateResponse( error.response );
                    emit( EVENTS.RESPONSE_ERROR, error );
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
