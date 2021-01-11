import { makeDecorator, useChannel } from '@storybook/addons';
import { AxiosInstance } from 'axios';

export const decorator = (axios: AxiosInstance) => makeDecorator( {
    name: 'withAxios',
    parameterName: 'axios',
    wrapper: (storyFn, context, data) => {
        const emit = useChannel( {} );

        axios.interceptors.request.use( (request) => {
            emit( 'axios-request', request );
            return request;
        } );

        axios.interceptors.response.use( (response) => {
            emit( 'axios-response', response );
            return response;
        } );

        return storyFn( context );
    },
} );
