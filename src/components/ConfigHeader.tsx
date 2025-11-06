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
      {configs.map(config => <tr>
        <td>{config.method.toUpperCase()}</td>
        <td>{config.url}</td>
      </tr>)}
    </Table>
  </div>;
};