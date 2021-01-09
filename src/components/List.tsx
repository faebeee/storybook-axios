import { Collapse } from 'antd';
import { AxiosResponse } from 'axios';
import React from 'react';
import { ListEntry, TYPES } from '../types';
import { RequestEntry } from './RequestEntry';
import { ResponseEntry } from './ResponseEntry';

export type Props = { list: ListEntry[] };

export const List = ({ list }: Props) => {
    return (<Collapse>
        { list.map( (entry, idx) => {
            return entry.type === TYPES.REQ ? <RequestEntry data={ entry.data } key={ idx }/> :
                <ResponseEntry data={ entry.data as AxiosResponse } key={ idx }/>;
        } ) }
    </Collapse>)
}
