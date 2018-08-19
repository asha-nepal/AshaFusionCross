/**
 * Copyright 2018 Yuichiro Tsuchiya
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

jest.unmock('react-redux');
jest.unmock('../index');

import { findActiveAlert } from '../index';

describe('findActiveAlert', () => {
  it('returns null with invalid input', () => {
    const alerts = [
      { type: 'danger', label: 'Danger', range: [-100, 100] },
    ];

    expect(findActiveAlert(null, alerts)).toBeNull();
  });

  it('finds alert matching given value', () => {
    const alerts = [
      { type: 'danger', label: 'Danger', range: [200, null] },
    ];

    expect(findActiveAlert(210, alerts)).toEqual(
      { type: 'danger', label: 'Danger', range: [200, null] }
    );
  });

  it('returns alert matching given value and normalRange', () => {
    const normalRange = [10, 20];

    expect(findActiveAlert(9, null, normalRange)).toEqual(
      { type: 'warning', label: 'Low' }
    );
    expect(findActiveAlert(10, null, normalRange)).toEqual(
      { type: 'success', label: 'Normal' }
    );
    expect(findActiveAlert(20, null, normalRange)).toEqual(
      { type: 'success', label: 'Normal' }
    );
    expect(findActiveAlert(21, null, normalRange)).toEqual(
      { type: 'warning', label: 'High' }
    );
  });
});
