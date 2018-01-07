/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import React from 'react';
import {
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from 'recharts';
import _get from 'lodash.get';
import { convert } from '../../forms/fields/TextUnitInput';

export default ({
  records,
  fields,
  yaxis,
  wrapperProps,
}: {
  records: Array<RecordObject>,
  fields: Array<{
    field: string,
    label: string,
  }>,
  yaxis: {
    label: string,
    unit: string,
  },
  wrapperProps?: Object,
}) => (
  <ScatterChart
    width={600}
    height={400}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    {...wrapperProps}
  >
    <XAxis
      dataKey="x"
      type="number"
      name="date"
      interval={60 * 60 * 1000}
      tickFormatter={t => (new Date(t).toString())}
      domain={['auto', 'auto']}
    />
    <YAxis
      dataKey="y"
      name={yaxis.label}
      unit={yaxis.unit}
    />
    <CartesianGrid verticalPoints={[]} />
    <Tooltip
      cursor={{ strokeDasharray: '3 3' }}
      formatter={(num, name) => {
        if (name === 'date') {
          return (new Date(num)).toString();
        }

        return num;
      }}
    />
    <Legend />
    {fields.map((field, i) => {
      const data = records
        .map(record => {
          const value = _get(record, field.field);
          return [
            record.$created_at || record.$initialized_at || null,
            typeof value === 'string' ? parseFloat(value) : convert(value, yaxis.unit),
          ];
        })
        .filter(plot => plot[0] != null && plot[1] != null)
        .map(plot => ({ x: plot[0] || 0, y: parseFloat(plot[1]) || 0 }));

      if (data.length === 0) { return null; }

      return (<Scatter
        key={i}
        name={field.label}
        data={data}
        fill={field.color || '#8884d8'}
        line shape="cross"
      />);
    })}
  </ScatterChart>
);
