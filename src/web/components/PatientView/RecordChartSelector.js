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
import RecordChart from '../RecordChart';

const types = [
  {
    label: 'Height',
    type: 'height',
    unit: 'cm',
    fields: [
      { field: 'height', label: 'Height', color: null },
    ],
  },
  {
    label: 'Weight',
    type: 'weight',
    unit: 'kg',
    fields: [
      { field: 'weight', label: 'Weight', color: null },
    ],
  },
  {
    label: 'Waist',
    type: 'waist',
    unit: 'cm',
    fields: [
      { field: 'waist', label: 'Waist', color: null },
    ],
  },
  {
    label: 'BP',
    type: 'bp',
    unit: 'mmHg',
    fields: [
      { field: 'bp.s', label: 'sBP', color: '#C390D4' },
      { field: 'bp.d', label: 'dBP', color: '#8884d8' },
    ],
  },
  {
    label: 'Pulse',
    type: 'pulse',
    unit: '/min',
    fields: [
      { field: 'pulse', label: 'Pulse', color: null },
    ],
  },
  {
    label: 'Temperature',
    type: 'temperature',
    unit: 'degF',
    fields: [
      { field: 'temperature', label: 'Temperature', color: null },
    ],
  },
  {
    label: 'SpO2',
    type: 'spo2',
    unit: '%',
    fields: [
      { field: 'spo2', label: 'SpO2', color: null },
    ],
  },
  {
    label: 'RR',
    type: 'rr',
    unit: '/min',
    fields: [
      { field: 'rr', label: 'RR', color: null },
    ],
  },
  {
    label: 'BS',
    type: 'bs',
    unit: '/min',
    fields: [
      { field: 'bs', label: 'BS', color: null },
    ],
  },
];

export default ({
  records,
  visibility,
  type = 'height',
  setType,
}: {
  records: Array<RecordObject>,
  type: string,
  visibility: boolean,
  setType: (type: string) => void,
}) => {
  if (!visibility) { return null; }

  const selectedType = types.find(t => t.type === type) || types[0];

  return (
    <div>
      <div className="tabs">
        <ul>
          {types.map((t, i) => (
            <li key={i} className={t.type === selectedType.type ? 'is-active' : null}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setType(t.type);
                }}
              >
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <RecordChart
        records={records}
        fields={selectedType.fields}
        yaxis={{
          label: selectedType.label,
          unit: selectedType.unit,
        }}
      />
    </div>
  );
};
