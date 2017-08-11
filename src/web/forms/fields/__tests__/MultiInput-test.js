/**
 * Copyright 2016 Yuichiro Tsuchiya
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
jest.unmock('../MultiInput');

import { mount } from 'enzyme';
import React from 'react';

import { MultiInputComponent } from '../MultiInput';

describe('<MultiInputComponent />', () => {
  it('shows <input />s according to given values', () => {
    const wrapper = mount(<MultiInputComponent
      label="THISISMULTIINPUT"
      values={['AAAA', 'BBBB', 'CCCC']}
    />);

    expect(wrapper.find('label').text()).toEqual('THISISMULTIINPUT');

    const inputs = wrapper.find('input');
    expect(inputs.length).toEqual(4);  // 3 (given values) + 1 (new value input field)
    expect(inputs.at(0).prop('value')).toEqual('AAAA');
    expect(inputs.at(1).prop('value')).toEqual('BBBB');
    expect(inputs.at(2).prop('value')).toEqual('CCCC');
  });

  it('does not show any <input />s if no value given', () => {
    const wrapper = mount(<MultiInputComponent
      label="THISISMULTIINPUT"
      values={null}
    />);

    expect(wrapper.find('label').text()).toEqual('THISISMULTIINPUT');

    const inputs = wrapper.find('input');
    expect(inputs.length).toEqual(1);  // 0 (given values) + 1 (new value input field)
  });

  it('contains <input />s whose type is specified by prop', () => {
    const wrapper = mount(<MultiInputComponent
      values={['AAAA', 'BBBB']}
      type="number"
    />);

    const inputs = wrapper.find('input');
    expect(inputs.at(0).prop('type')).toEqual('number');
    expect(inputs.at(1).prop('type')).toEqual('number');
  });

  it('adds new input just by typing', () => {
    const onChange = jest.fn();
    const onAddItemRequested = jest.fn();

    const wrapper = mount(<MultiInputComponent
      values={['AAAA', 'BBBB']}
      onChange={onChange}
      onAddItemRequested={onAddItemRequested}
    />);

    const inputs = wrapper.find('input');
    const targetInput = inputs.at(2);

    targetInput.simulate('change', { target: { value: 'a' } });
    expect(onAddItemRequested).toBeCalledWith('a');
  });
});
