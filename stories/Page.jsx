import { Button } from 'antd';
import React from 'react-dom';
import { getAxios } from '../utils/get-axios';

export const Page = ({ method, config }) => {
    const execRequest = () => {
        getAxios()[method]('https://swapi.dev/api/people/?search=r2', config);
    }

    return (<Button type="primary" onClick={ execRequest }>Load</Button>);
};
