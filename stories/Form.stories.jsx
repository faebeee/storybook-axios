import React from 'react';
import { Form } from './Form';


export default {
    title: 'Form',
    component: Form,
    argTypes: {
        url: { defaultValue: 'https://d9ef6d5321d6e4acd1de452ad45a8d86.m.pipedream.net' },
    },
};

export const Post = (args) => <Form method="post" { ...args }/>;
export const Get = (args) => <Form method="get" { ...args }/>;
export const Put = (args) => <Form method="put" { ...args }/>;
export const Delete = (args) => <Form method="delete" { ...args }/>;
