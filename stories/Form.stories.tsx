import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';

const meta: Meta<typeof Form> = {
    title: 'Form',
    component: Form,
    args: {
        url: 'https://d9ef6d5321d6e4acd1de452ad45a8d86.m.pipedream.net',
    },
};
export default meta;

type Story = StoryObj<typeof Form>;

export const Post: Story = {
    args: {
        method: 'post',
    },
};

export const Get: Story = {
    args: {
        method: 'get',
    },
};

export const Put: Story = {
    args: {
        method: 'put',
    },
};

export const Delete: Story = {
    args: {
        method: 'delete',
    },
};
