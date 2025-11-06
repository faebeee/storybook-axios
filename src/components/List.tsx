import { DownloadIcon, UploadIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Badge, Button, Modal, SyntaxHighlighter, Table } from 'storybook/internal/components';

import { type ListEntry, TYPES } from '../types';

export type ListProps = {list: ListEntry[]};

export const List = ({ list }: ListProps) => {
  const [open, setOpen] = useState(false);
  const [dataToShow, setDataToShow] = useState<ListEntry | null>(null);

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
          extra: <UploadIcon style={{ color: 'blue' }}/>
        };
      case TYPES.RES:
        return {
          key,
          type: entry.type,
          status: entry.data.status,
          url: entry.data.config.url,
          data: entry,
          label: `${entry.data.status} ${entry.data.config.url}`,
          extra: <DownloadIcon style={{ color: 'green' }}/>
        };
      case TYPES.RES_ERR:
        return {
          key,
          type: entry.type,
          status: entry.data.status,
          url: entry.data.config?.url,
          data: entry,
          label: `${entry.data.status} ${entry.data.config?.url}`,
          extra: <DownloadIcon style={{ color: 'red' }}/>
        };
    }
  });

  return <div>
    <h3>Request histoy</h3>
    <Table className={'w-full'}>
      {items.map(item => <tr key={item.key}>
        <td>
          <>{item.status ? <Badge
            status={item.status > 399 ? 'negative' : 'positive'}>{
              item.status}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
          </Badge>: item.data.data.method?.toUpperCase()}</>
        </td>

        <td>
          {item.url}
        </td>

        <td>
          {item.type !== TYPES.REQ && <Button onClick={() => {
            setDataToShow(item.data);
            setOpen(true);
          }}>
            Inspect
          </Button>}
        </td>
      </tr>)}
    </Table>

    <Modal open={open} onOpenChange={v => setOpen(v)}>
      <div style={{ padding: '16px' }}>
        <h1>Intercepted response</h1>
        {dataToShow && <SyntaxHighlighter language={'json'}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          {JSON.stringify(dataToShow.data.data, null, 2)}
        </SyntaxHighlighter>}
      </div>
    </Modal>
  </div>;
};
