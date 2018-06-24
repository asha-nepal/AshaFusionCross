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
import React from 'react';
import { shallow } from 'enzyme';

import RecordsTab from '../RecordsTab';

jest.unmock('../RecordsTab');

describe('<RecordsTab />', () => {
  it('shows $created_at or $initialized_at field', () => {
    const date1 = new Date(2015, 4, 1, 10, 30, 30);
    const date2 = new Date(2015, 6, 2, 12, 24, 50);
    const date3 = new Date(2015, 8, 3, 14, 10, 30);

    const records = [
      {
        _id: '001',
        $initialized_at: date1.getTime(),
        $created_at: date2.getTime(),
      },
      {
        _id: '002',
        $initialized_at: date3.getTime(),
      },
    ];

    const wrapper = shallow(
      <RecordsTab
        records={records}
      />,
    );

    expect(wrapper.find('a small').at(0).text())
      .toEqual(date2.toDateString());
    expect(wrapper.find('a small').at(1).text())
      .toEqual(date3.toDateString());
  });
});
