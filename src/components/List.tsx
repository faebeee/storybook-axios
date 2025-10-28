import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Drawer, List as AntList, Tag } from 'antd';
import React, { useState } from 'react';

import { type ListEntry, TYPES } from '../types';
import { RequestEntry } from './RequestEntry';
import { ResponseEntry } from './ResponseEntry';
import { ResponseErrorEntry } from './ResponseErrorEntry';

export type ListProps = {list: ListEntry[]};

export const List = ({ list }: ListProps) => {
  const [open, setOpen] = useState(false);
  const [dataToShow, setDataToShow] = useState<ListEntry | null>(null);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const items = list.map((entry, idx) => {
    const key = String(idx);

    switch (entry.type) {
      case TYPES.REQ:
        return {
          key,
          status: null,
          url: entry.data.url,
          type: entry.type,
          data: entry,
          label: `${entry.data.method?.toUpperCase()} ${entry.data.url}`,
          children: <RequestEntry data={entry.data}/>,
          extra: <UploadOutlined style={{ color: 'blue' }}/>
        };
      case TYPES.RES:
        return {
          key,
          type: entry.type,
          status: entry.data.status,
          url: entry.data.config.url,
          data: entry,
          children: <ResponseEntry data={entry.data}/>,
          label: `${entry.data.status} ${entry.data.config.url}`,
          extra: <DownloadOutlined style={{ color: 'green' }}/>
        };
      case TYPES.RES_ERR:
        return {
          key,
          type: entry.type,
          status: entry.data.status,
          url: entry.data.config.url,
          data: entry,
          label: `${entry.data.status} ${entry.data.config?.url}`,
          children: <ResponseErrorEntry data={entry.data}/>,
          extra: <DownloadOutlined style={{ color: 'red' }}/>
        };
    }
  });

  return <>
    <AntList
      size="large"
      bordered
      dataSource={items}
      renderItem={item => <AntList.Item
        actions={[
          <>
            <Button onClick={() => {
              setDataToShow(item.data);
              showDrawer();
            }}>Inspect
            </Button>
          </>
        ]}
      >
        <AntList.Item.Meta
          avatar={<>{item.status ?<Tag color={item.status > 399 ? 'red' : 'green'}>{item.status}</Tag> : null}</>}
          title={<>{item.url}</>}
          description={item.type === TYPES.REQ ? item.data.data.method : ''}
        />

      </AntList.Item>}
    />

    <Drawer
      title="Inspect Data"
      closable={{ 'aria-label': 'Close Button' }}
      onClose={onClose}
      open={open}
    >
      {dataToShow && <pre>{JSON.stringify(dataToShow.data, null, 2)}</pre>}
    </Drawer>
  </>;

};
