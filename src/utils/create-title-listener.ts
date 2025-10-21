import { API } from 'storybook/manager-api';
import { EVENTS, type ListEntry, TYPES } from '../types';

export function createTitleListener(api: API): () => string {
  let requestCount = 0;
  let responseCount = 0;
  let errorCount = 0;

  api.on(EVENTS.UPDATE_COUNT, ({ entries }: { entries: ListEntry[] }) => {
    requestCount = entries.filter(entry => [TYPES.REQ].includes(entry.type)).length;
    responseCount = entries.filter(entry => [TYPES.RES].includes(entry.type)).length;
    errorCount = entries.filter(entry => [TYPES.RES_ERR].includes(entry.type)).length;
  });

  return () => `Axios (${requestCount} / ${responseCount} / ${errorCount})`;
}
