import type { AxiosRequestConfig } from 'axios';
import React from 'react';
import { getAxios } from '../utils/get-axios';
import { Button } from '@/components/ui/button';

export interface PageProps {
  url: string;
  config?: AxiosRequestConfig;
}

export const ComplexPage = ({ url }: PageProps) => {
  const execRequest = async () => {
    await getAxios().post(url);
    await getAxios().post(url);
  };

  return (
    <Button onClick={execRequest}>
      Load
    </Button>
  );
};
