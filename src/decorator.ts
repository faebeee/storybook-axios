import { makeDecorator, useChannel } from '@storybook/addons';

export const decorator = (axios: unknown) => makeDecorator( {
    name: 'withAxios',
    parameterName: 'axios',
    wrapper: (storyFn, context, data) => {
        const emit = useChannel( {} );

        data.parameters.interceptors.request.use( (response: unknown) => {
            emit( 'axios-request', response );
            return response;
        } );

        data.parameters.interceptors.response.use( (response: unknown) => {
            emit( 'axios-response', response );
            return response;
        } );

        return storyFn( context );
    },
} );
