import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export const viteFinal = config => {
  throw new Error('viteFinal is not supported in local preset');
  return mergeConfig(config, {
    plugins: [tsconfigPaths()]
  });
};


export function managerEntries() {
  return [fileURLToPath(import.meta.resolve('../src/manager'))];
}