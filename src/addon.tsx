import React, { useState } from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { STORY_CHANGED } from '@storybook/core-events';
import { Collapse, Divider, Empty } from 'antd';
import { List } from './components/List';

const { Panel } = Collapse;
import 'antd/dist/antd.css';
import { TYPES } from './types';

const RequestList = ({ list }) => {
    // @ts-ignore
    return (<>
        <Collapse>
            { list.map( (request, idx) => {
                const title = `${ request.method.toUpperCase() } ${ request.url }`;
                return (<Panel header={ title } key={ idx }>
                    <Divider orientation="left" plain>Headers</Divider>
                    { JSON.stringify( request.headers ) }

                    <Divider orientation="left" plain>Data</Divider>
                    { JSON.stringify( request.data ) }
                </Panel>);
            } ) }
        </Collapse>
    </>)
}

const ResponseList = ({ list }) => {
    // @ts-ignore
    return (<>
        <Collapse>
            { list.map( (response, idx) => {
                const title = `${ response.status } ${ response.config.url }`;
                return (<Panel header={ title } key={ idx }>
                    <Divider orientation="left" plain>Headers</Divider>
                    { JSON.stringify( response.headers ) }

                    <Divider orientation="left" plain>Data</Divider>
                    { JSON.stringify( response.data ) }
                </Panel>);
            } ) }
        </Collapse>
    </>)
}

export default () => {
    addons.register( 'faebeee/storybook-axios', (api) => {
        addons.add( 'storybook-axios/panel', {
            title: 'Axios',
            type: types.PANEL,
            render: ({ active, key }) => {
                const [entries, setEntries] = useState( [] );
                addons.getChannel().addListener( STORY_CHANGED, () => {
                    setEntries( [] );
                } );

                addons.getChannel().addListener( 'axios-request', (data) => {
                    setEntries( [...entries, { type: TYPES.REQ, data }] );
                } );

                addons.getChannel().addListener( 'axios-response', (data) => {
                    setEntries( [...entries, { type: TYPES.RES, data }] );
                } );

                // @ts-ignore
                return (<AddonPanel active={ active } key={ key }>
                    { entries.length === 0 ? <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE }/> :
                        (<><List list={ entries }/></>) }
                </AddonPanel>);
            },
        } );
    } );
}
