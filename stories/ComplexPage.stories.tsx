import { Meta } from '@storybook/react';
import React from 'react';
import { ComplexPage } from './ComplexPage';
import { Page } from './Page';

export default {
  title: 'Multiple Requests',
  component: Page,
  args: {
    url: 'https://d9ef6d5321d6e4acd1de452ad45a8d86.m.pipedream.net'
  }
} as Meta<typeof ComplexPage>;

export const Default = args => (
  <ComplexPage {...args}/>
);
