import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  'stories': [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],

  'addons': [
    '@storybook/addon-links',
    '../src/manager.ts'
  ],
  'framework': {
    'name': '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'vite.storybook.config.js'
      }
    }
  },
};
export default config;