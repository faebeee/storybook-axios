import React from 'react';
import { Form } from './Form';


export default {
    title: 'Form',
    component: Form,
    argTypes: {
        method: { defaultValue: 'post' },
        url: { defaultValue: 'https://d9ef6d5321d6e4acd1de452ad45a8d86.m.pipedream.net' },
    },
};

export const Post = (args, { argTypes }) => <Form method="post" { ...args }/>;
