import type { Meta, StoryObj } from '@storybook/react';
import { Page } from './Page';

const meta: Meta<typeof Page> = {
    title: 'Ajax',
    component: Page,
    args: {
        url: 'https://d9ef6d5321d6e4acd1de452ad45a8d86.m.pipedream.net',
    },
};
export default meta;

type Story = StoryObj<typeof Page>;

export const Get: Story = {
    args: {
        method: 'get',
        config: null,
    },
};

export const Post: Story = {
    args: {
        method: 'post',
        config: { data: { foo: 'bar' } },
    },
};

export const Put: Story = {
    args: {
        method: 'put',
        config: { data: { foo: 'bar' } },
    },
};

export const Patch: Story = {
    args: {
        method: 'patch',
        config: { data: { foo: 'bar' } },
    },
};

export const Delete: Story = {
    args: {
        method: 'delete',
        config: { params: { data: { foo: 'bar' } } },
    },
};
