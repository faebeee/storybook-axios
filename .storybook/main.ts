import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  'stories': [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  'addons': [
    '@storybook/addon-links',
    '../src/manager.tsx'
  ],
  framework: {
    name: '@storybook/react-vite' // Your framework name here.
  }
};


export default config;