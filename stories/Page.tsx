import { Button } from '@/components/ui/button';
import type { AxiosRequestConfig } from 'axios';
import React from 'react';
import { getAxios } from '../utils/get-axios';

export interface PageProps {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  config?: AxiosRequestConfig;
}

export const Page = ({ url, method, config }: PageProps) => {
  const execRequest = () => {
    getAxios()[method](url, config);
  };

  return (
    <Button onClick={execRequest}>
      Load
    </Button>
  );
};
