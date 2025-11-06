import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ComplexPage } from './ComplexPage';
import { Page } from './Page';

export default {
  title: 'Multiple Requests',
  component: Page,
  args: {
    url: 'https://swapi.dev/api/planets/1/?format=json'
  }
} as Meta<typeof ComplexPage>;

export const Default = args => (
  <ComplexPage {...args}/>
);

export const WithPassthrough: StoryObj<typeof ComplexPage> = {
  parameters: {
    axios: {
      passThrough: true
    }
  },
  render: args => (
    <ComplexPage {...args}/>
  )
};

export const WithCatchAll: StoryObj<typeof ComplexPage> = {
  parameters: {
    axios: {
      catchAll: true
    }
  },
  render: args => (
    <ComplexPage {...args}/>
  )
};

export const WithMock: StoryObj<typeof ComplexPage> = {
  parameters: {
    axios: {
      mock: mock => {
        mock.onGet('https://swapi.dev/api/planets/1/?format=json').reply(200, {
          name: 'Tatooine'
        });
      }
    }
  },
  render: args => (
    <ComplexPage {...args}/>
  )
};
