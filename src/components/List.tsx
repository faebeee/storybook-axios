import { Collapse } from 'antd';
import type { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import { type ListEntry, TYPES } from '../types';
import { RequestEntry } from './RequestEntry';
import { ResponseEntry } from './ResponseEntry';
import { ResponseErrorEntry } from './ResponseErrorEntry';

export type Props = { list: ListEntry[] };

export const List = ({ list }: Props) => {
    const MAP = {
        [TYPES.REQ]: (entry, index) => <RequestEntry data={ entry.data } key={ index }/>,
        [TYPES.RES]: (entry, index) => <ResponseEntry data={ entry.data as AxiosResponse } key={ index }/>,
        [TYPES.RES_ERR]: (entry, index) => <ResponseErrorEntry data={ entry.data as AxiosError } key={ index }/>,
    };

    return (<Collapse>
        { list.map( (entry, idx) => {
            return MAP[entry.type]( entry, idx );
        } ) }
    </Collapse>)
}
