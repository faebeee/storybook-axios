import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Form } from './Form';

export default {
  title: 'Form',
  component: Form,
  args: {
    url: 'https://swapi.dev/api/planets/1/?format=json'
  }
} as Meta<typeof Form>;

export const Post: StoryFn<typeof Form> = args => <Form {...args} method="post"/>;
export const Get: StoryFn<typeof Form> = args => <Form {...args} method="get"/>;
export const Put: StoryFn<typeof Form> = args => <Form {...args} method="put"/>;
export const Delete: StoryFn<typeof Form> = args => <Form {...args} method="delete"/>;
