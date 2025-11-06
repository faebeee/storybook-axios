import React, { FC } from 'react';
import { Table } from 'storybook/internal/components';
import { AxiosMockHandlersConfig } from '../types';

export type ConfigHeaderProps = {
  configs: AxiosMockHandlersConfig[];
};

export const ConfigHeader: FC<ConfigHeaderProps> = ({ configs }) => {
  return <div>
    <h3>Mocked requests</h3>
    <Table>
      {configs.map(config => <tr key={config.id}>
        <td>{config.method?.toUpperCase()}</td>
        <td>{config.url.toString()}</td>
      </tr>)}
    </Table>
  </div>;
};