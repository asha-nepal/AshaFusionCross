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

jest.unmock('react-redux');
jest.unmock('../common/as-array');
jest.unmock('../CheckGroup');

import { shallow } from 'enzyme';
import React from 'react';

import { CheckGroupComponent } from '../CheckGroup';

describe('<CheckGroupComponent />', () => {
  it('adds value when a unchecked button is clicked', () => {
    const mockOnChange = jest.fn();
    const mockEventObject = {
      preventDefault: jest.fn(),
    };

    const wrapper = shallow(<CheckGroupComponent
      value={['a']}
      options={[
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' },
        { id: 'c', label: 'C' },
      ]}
      onChange={mockOnChange}
    />);

    wrapper.find('a').at(1)
      .simulate('click', mockEventObject);
    expect(mockOnChange).toBeCalledWith(['a', 'b']);
  });

  it('removes value as checked button is clicked', () => {
    const mockOnChange = jest.fn();
    const mockEventObject = {
      preventDefault: jest.fn(),
    };

    const wrapper = shallow(<CheckGroupComponent
      value={['a', 'b']}
      options={[
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' },
        { id: 'c', label: 'C' },
      ]}
      onChange={mockOnChange}
    />);

    wrapper.find('a').at(1)
      .simulate('click', mockEventObject);
    expect(mockOnChange).toBeCalledWith(['a']);
  });
});
