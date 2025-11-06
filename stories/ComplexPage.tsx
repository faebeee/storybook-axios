import type { AxiosRequestConfig } from 'axios';
import React, { useEffect } from 'react';
import { Button } from '../src/components/ui/button';
import { getAxios } from '../utils/get-axios';


export interface PageProps {
  url: string;
  config?: AxiosRequestConfig;
}

export const ComplexPage = ({ url }: PageProps) => {
  const execRequest = async () => {
    await getAxios().get(url);
  };

  useEffect(() => {
    execRequest();
  }, []);

  return (
    <Button onClick={execRequest}>
      Load
    </Button>
  );
};
