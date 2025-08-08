/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    core: {
        disableTelemetry: true,
    },
    stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '../register'],
    docs: {
        autodocs: true,
    },
};

export default config;
