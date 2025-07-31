import type { ComponentMeta } from '@storybook/react';
import React from 'react';
import { Page } from './Page';

export default {
    title: 'Ajax',
    component: Page,
    argTypes: {
        url: { defaultValue: 'https://d9ef6d5321d6e4acd1de452ad45a8d86.m.pipedream.net' },
    },
} as ComponentMeta<typeof Page>;

export const Get = (args) => <Page method="get" config={null} {...args} />;
export const Post = (args) => <Page method="post" config={{ foo: 'bar' }} {...args} />;
export const Put = (args) => <Page method="put" config={{ foo: 'bar' }} {...args} />;
export const Patch = (args) => <Page method="patch" config={{ foo: 'bar' }} {...args} />;
export const Delete = (args) => (
    <Page method="delete" config={{ params: { foo: 'bar' } }} {...args} />
);
