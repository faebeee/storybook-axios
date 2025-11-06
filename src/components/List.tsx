import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { ChevronRightIcon, DownloadIcon, UploadIcon } from 'lucide-react';
import React, { useState } from 'react';

import { type ListEntry, TYPES } from '../types';

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

  return <>
    <ul>
      {items.map(item => <Item key={item.key}>
        <ItemMedia>
          <>{item.status ? <Badge color={item.status > 399 ? 'red' : 'green'}>{item.status}</Badge> : null}</>
        </ItemMedia>

        <ItemContent>
          <ItemTitle>{item.url}</ItemTitle>
        </ItemContent>

        <ItemActions>
          <Button onClick={() => {
            setDataToShow(item.data);
            showDrawer();
          }}>

            <ChevronRightIcon className="size-4"/>
          </Button>
        </ItemActions>

      </Item>)}

    </ul>

    <Drawer open={open} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Inspect Data</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          {dataToShow && <pre>{JSON.stringify(dataToShow.data, null, 2)}</pre>}
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </>;
};
