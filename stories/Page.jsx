import { Button } from 'antd';
import React from 'react-dom';
import { getAxios } from '../utils/get-axios';

export const Page = ({ url, method, config }) => {
    const execRequest = () => {
        getAxios()[method](url, config)
            .catch(e => alert(e.message));
    }

    return (<Button type="primary" onClick={ execRequest }>Load</Button>);
};
