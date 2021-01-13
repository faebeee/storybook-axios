import { makeDecorator, useChannel } from '@storybook/addons';
import { AxiosInstance } from 'axios';
import { useEffect } from 'react';

export const decorator = (axios: AxiosInstance) => makeDecorator( {
    name: 'withAxios',
    parameterName: 'axios',
    wrapper: (storyFn, context, data) => {
        const emit = useChannel( {} );
        const onReq = (request) => {
            emit( 'axios-request', request );
            return request;
        };

        const onRes = (response) => {
            emit( 'axios-response', response );
            return response;
        }

        useEffect( () => {
            const reqInt = axios.interceptors.request.use( onReq );
            const resInt = axios.interceptors.response.use( onRes );

            return () => {
                axios.interceptors.request.eject( reqInt );
                axios.interceptors.response.eject( resInt );
            }
        } );

        return storyFn( context );
    },
} );
