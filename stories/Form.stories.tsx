import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Form } from './Form';

export default {
  title: 'Form',
  component: Form,
  args: {
    url: 'https://d9ef6d5321d6e4acd1de452ad45a8d86.m.pipedream.net'
  }
} as Meta<typeof Form>;

export const Post: StoryFn<typeof Form> = args => <Form {...args} method="post"/>;
export const Get: StoryFn<typeof Form> = args => <Form {...args} method="get"/>;
export const Put: StoryFn<typeof Form> = args => <Form {...args} method="put"/>;
export const Delete: StoryFn<typeof Form> = args => <Form {...args} method="delete"/>;
