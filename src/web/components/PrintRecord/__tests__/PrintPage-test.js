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

/* eslint-env jest */

jest.unmock('../PrintPage');

import PrintPage from '../PrintPage';

import React from 'react';
import { shallow } from 'enzyme';

describe('<PrintPage/>', () => {
  it('takes patient and record data then render', () => {
    const patient = {
      _id: 'patient_foo',
      name: 'Foo Bar',
      age: { value: 25, unit: 'years' },
      address: 'Tokyo',
    };

    const record = {
      $created_at: 1499583311,
      height: { value: 178, unit: 'cm' },
      weight: { value: 68, unit: 'kg' },
      pulse: 90,
    };

    shallow(
      <PrintPage
        patient={patient}
        record={record}
      />
    );
  });
});
