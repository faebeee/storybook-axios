import React from 'react';
import type { AxiosError } from 'axios';

export type Props = { data: AxiosError };

export const ResponseErrorEntry = ({ data }: Props) => {
  console.log(data);
  return <div>
    <pre className="pre">{data.message}</pre>
    <pre className="pre">{data.stack}</pre>
  </div>;
};
