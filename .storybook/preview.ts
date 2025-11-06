import type { Preview } from '@storybook/react-vite';
import '../src/styles/globals.css';
import { withStorybookAxios } from '../src/decorator';
import { getAxios } from '../utils/get-axios';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export const decorators = [
  withStorybookAxios(getAxios())
];

export default preview;