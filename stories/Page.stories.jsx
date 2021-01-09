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

export const Get = (args) => <Page method="get" config={ null } { ...args } />;
export const Post = (args) => <Page method="post" config={ { foo: 'bar' } } { ...args } />;
export const Put = (args) => <Page method="put" config={ { foo: 'bar' } } { ...args } />;
export const Patch = (args) => <Page method="patch" config={ { foo: 'bar' } } { ...args } />;
export const Delete = (args) => <Page method="delete" config={ { params: { foo: 'bar' } } } { ...args } />;
