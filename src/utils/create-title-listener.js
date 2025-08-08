import { EVENTS, TYPES } from '../types';
export function createTitleListener(api) {
    let requestCount = 0;
    let responseCount = 0;
    let errorCount = 0;
    api.on(EVENTS.UPDATE_COUNT, ({ entries }) => {
        requestCount = entries.filter((entry) => [TYPES.REQ].includes(entry.type)).length;
        responseCount = entries.filter((entry) => [TYPES.RES].includes(entry.type)).length;
        errorCount = entries.filter((entry) => [TYPES.RES_ERR].includes(entry.type)).length;
    });
    return () => `Axios (${requestCount} / ${responseCount} / ${errorCount})`;
}
