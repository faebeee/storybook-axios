import React, { useState } from 'react';
import { AddonPanel } from '@storybook/components';
import { addons, types, useChannel } from '@storybook/addons';
import { makeDecorator } from '@storybook/addons';
import { Collapse, Result, Divider, Empty } from 'antd';

const { Panel } = Collapse;

import 'antd/dist/antd.css';

export const decorator = (axios: unknown) => makeDecorator( {
    name: 'withAxios',
    parameterName: 'axios',
    wrapper: (storyFn, context, data) => {
        const emit = useChannel( {} );

        data.parameters.interceptors.response.use( (response: unknown) => {
            emit( 'axios-request', response );
            return response;
        } );
        return storyFn( context );
    },
} );

export default decorator;


const Content = ({ list }) => {
    // @ts-ignore
    return (<>
        <Collapse>
            { list.map( (request, idx) => {
                const title = `${ request.config.method.toUpperCase() } ${ request.config.url }`;
                return (<Panel header={ title } key={ idx }>
                    <Divider orientation="left" plain>Headers</Divider>
                    { JSON.stringify( request.config.headers ) }

                    <Divider orientation="left" plain>Data</Divider>
                    { JSON.stringify( request.config.headers ) }

                    <Divider orientation="left" plain>Stuff</Divider>
                    { JSON.stringify( request.config.headers ) }
                </Panel>);
            } ) }
        </Collapse>
    </>)
}


addons.register( 'faebeee/storybook-axios', (api) => {

    addons.add( 'storybook-axios/panel', {
        title: 'Axios',
        type: types.PANEL,
        render: ({ active, key }) => {
            const [requests, setRequests] = useState( [] );
            addons.getChannel().addListener( 'axios-request', (data) => {
                setRequests( [...requests, data] );
            } );

            // @ts-ignore
            return (<AddonPanel active={ active } key={ key }>
                { requests.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : <Content list={ requests }/> }
            </AddonPanel>);
        },
    } );
} );
