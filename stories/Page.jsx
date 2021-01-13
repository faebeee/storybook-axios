import { Button } from 'antd';
import React from 'react-dom';
import { getAxios } from '../utils/get-axios';

export const Page = ({ url, method, config }) => {
    const execRequest = () => {
        getAxios()[method](url, config);
    }

    return (<Button type="primary" onClick={ execRequest }>Load</Button>);
};
