import React from 'react';
import { getAxios } from '../utils/get-axios';

import { Page } from './Page';

export default {
    title: 'Example',
    component: Page,
    parameters: {
        axios: getAxios(),
    },
};

export const Default = (args) => <Page { ...args } />;
