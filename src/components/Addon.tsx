import React, { FC, useEffect, useState } from 'react';
import { AddonPanel } from 'storybook/internal/components';
import { STORY_CHANGED } from 'storybook/internal/core-events';
import { addons } from 'storybook/manager-api';
import { AxiosMockHandlersConfig, EVENTS, type ListEntry, TYPES } from '../types';
import { ConfigHeader } from './ConfigHeader';
import { List } from './List';

export type Props = {
  active: boolean;
};

export const Addon: FC<Props> = ({ active }) => {
  const [entries, setEntries] = useState<ListEntry[]>([]);
  const [config, setConfig] = useState<AxiosMockHandlersConfig[]>([]);
  const onRequest = data => setEntries(entries => [...entries, { type: TYPES.REQ, data }]);
  const onResponse = data => setEntries(entries => [...entries, { type: TYPES.RES, data }]);
  const onResponseError = data => setEntries(entries => [...entries, { type: TYPES.RES_ERR, data }]);
  const onStoryChanged = () => {
    setEntries([]);
    setConfig([]);
  };

  const onConfigChanged = (data: AxiosMockHandlersConfig[]) => {
    setConfig(data);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies : ignoring for now
  useEffect(() => {
    addons.getChannel().addListener(STORY_CHANGED, onStoryChanged);
    addons.getChannel().addListener(EVENTS.MOCK_CONFIG, onConfigChanged);

    addons.getChannel().addListener(EVENTS.REQUEST, onRequest);
    addons.getChannel().addListener(EVENTS.RESPONSE, onResponse);
    addons.getChannel().addListener(EVENTS.RESPONSE_ERROR, onResponseError);

    return () => {
      addons.getChannel().removeListener(EVENTS.MOCK_CONFIG, onConfigChanged);
      addons.getChannel().removeListener(STORY_CHANGED, onStoryChanged);
      addons.getChannel().removeListener(EVENTS.REQUEST, onRequest);
      addons.getChannel().removeListener(EVENTS.RESPONSE, onResponse);
      addons.getChannel().removeListener(EVENTS.RESPONSE_ERROR, onResponseError);
    };
    // biome-ignore lint/correctness/useExhaustiveDependencies : ignoring for now
  }, [onRequest, onResponse, onResponseError]);

  return (
    <AddonPanel active={active}>
      <div style={{ padding: '16px' }}>
        {config.length > 0 && <ConfigHeader configs={config}/>}
        {entries.length === 0 ? (
          <div>No requests made yet</div>
        ) : (
          <>
            <List list={entries}/>
          </>
        )}
      </div>
    </AddonPanel>
  );
};
