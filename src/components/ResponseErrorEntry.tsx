import React from 'react';
import type { AxiosError } from 'axios';

export type Props = { data: AxiosError };

export const ResponseErrorEntry = ({ data }: Props) => {
    return <pre className="pre">{data.message}</pre>;
};
