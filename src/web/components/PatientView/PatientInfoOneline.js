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
  TextUnitInputComponent,
} from '../../forms/fields';

export default ({
  patient,
  ...rest
}: {
  patient: ?PatientObject,
}) => {
  const elements = [
    (patient.number ? `[${patient.number}] ` : '') + (patient.name || ''),
    patient.age
      && (
      <span>
        Age:
        <div style={{ display: 'inline-block' }}>
          <TextUnitInputComponent
            value={patient.age}
            units={['years', 'months']}
            readonly
          />
        </div>
      </span>
      ),
    patient.sex && `Sex: ${patient.sex}`,
    patient.address && `Address: ${patient.address}`,
  ]
    .filter(element => element != null);

  const delimiter = '/';
  const delimited = elements.reduce(
    (a, b, i) => (i === 0 ? a.concat(b) : a.concat([delimiter, b])), [],
  );

  return (
    <div {...rest} className="columns is-vcentered is-mobile is-multiline is-variable is-1">
      {delimited.map((elem, i) => (
        <span key={i} className="column is-narrow">
          {elem}
        </span>
      ))}
    </div>
  );
};
