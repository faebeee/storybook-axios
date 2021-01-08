import React from 'react-dom';
import { getAxios } from '../utils/get-axios';

export const Page = () => {
    const execRequest = () => {
        getAxios().get( 'https://swapi.dev/api/people/?search=r2' )
            .then( () => {

            } )
    }
    return (<button onClick={ execRequest }>Load</button>);
};
