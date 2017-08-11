/**
 * Copyright 2016-2017 Yuichiro Tsuchiya
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
jest.unmock('../TextUnitInput');

import React from 'react';
import { shallow } from 'enzyme';
import math from 'lib/mathjs';

import { convert, TextUnitInputComponent } from '../TextUnitInput';

describe('TextUnitInput.convert', () => {
  let MockMathUnit;
  let mockMathUnitToNumber;

  beforeEach(() => {
    mockMathUnitToNumber = jest.fn().mockReturnValue(1234);
    MockMathUnit = class {
      toNumber = mockMathUnitToNumber;
    };
    math.unit = jest.fn().mockReturnValue(new MockMathUnit());
  });

  it('converts unit', () => {
    const value = {
      value: '180',
      unit: 'cm',
    };
    const targetUnit = 'in';

    convert(value, targetUnit);

    expect(math.unit).toBeCalledWith('180', 'cm');
    expect(mockMathUnitToNumber).toBeCalledWith('in');
  });

  it('returns as invalid input given', () => {
    const value = null;
    const targetUnit = 'in';

    convert(value, targetUnit);

    expect(math.unit).not.toBeCalled();
    expect(mockMathUnitToNumber).not.toBeCalled();
  });

  it('returns input value directly if given units are the same', () => {
    const value = {
      value: '70',
      unit: 'in',
    };
    const targetUnit = 'in';

    expect(convert(value, targetUnit)).toEqual(70);
    expect(math.unit).not.toBeCalled();
    expect(mockMathUnitToNumber).not.toBeCalled();
  });

  it('cuts off result as precision argument given', () => {
    mockMathUnitToNumber.mockReturnValue(12.9876);
    const value = {
      value: '180',
      unit: 'cm',
    };
    const targetUnit = 'in';
    const precision = 2;

    expect(convert(value, targetUnit, precision)).toEqual(12.99);
  });
});

describe('<TextUnitInput />', () => {
  it('can handle decimal point', () => {
    const onChange = jest.fn();

    const wrapper = shallow(
      <TextUnitInputComponent
        value={{ value: 160, unit: 'cm' }}
        onChange={onChange}
        units={['cm']}
      />
    );

    const getInput = () => wrapper.find('input').at(0);
    const getSelect = () => wrapper.find('select').at(0);

    expect(getInput().prop('value')).toEqual('160');
    expect(getSelect().prop('value')).toEqual('cm');

    getInput().simulate('change', { target: { value: '160.' } });

    expect(onChange).toBeCalledWith({ value: 160, unit: 'cm' });
    wrapper.setProps({ value: { value: 160, unit: 'cm' } });

    expect(getInput().prop('value')).toEqual('160.');

    getInput().simulate('change', { target: { value: '160.5' } });

    expect(onChange).toBeCalledWith({ value: 160.5, unit: 'cm' });
    wrapper.setProps({ value: { value: 160.5, unit: 'cm' } });

    expect(getInput().prop('value')).toEqual('160.5');
  });

  it('limits precision', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <TextUnitInputComponent
        value={{ value: 160, unit: 'cm' }}
        units={['cm']}
        onChange={onChange}
        precision={1}
      />
    );

    const getInput = () => wrapper.find('input').at(0);

    expect(getInput().prop('value')).toEqual('160');

    getInput().simulate('change', { target: { value: '160.5' } });
    expect(onChange).toBeCalledWith({ value: 160.5, unit: 'cm' });

    wrapper.setProps({ value: { value: 160.5, unit: 'cm' } });
    expect(getInput().prop('value')).toEqual('160.5');

    getInput().simulate('change', { target: { value: '160.55' } });
    expect(onChange).toBeCalledWith({ value: 160.5, unit: 'cm' });
  });

  it('can take number', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <TextUnitInputComponent
        value={160}
        units={['cm']}
        onChange={onChange}
      />
    );

    const getInput = () => wrapper.find('input').at(0);

    expect(getInput().prop('value')).toEqual('160');
    getInput().simulate('change', { target: { value: '160.5' } });
    expect(onChange).toBeCalledWith({ value: 160.5, unit: 'cm' });
  });

  it('can take string', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <TextUnitInputComponent
        value="160"
        units={['cm']}
        onChange={onChange}
      />
    );

    const getInput = () => wrapper.find('input').at(0);

    expect(getInput().prop('value')).toEqual('160');
    getInput().simulate('change', { target: { value: '160.5' } });
    expect(onChange).toBeCalledWith({ value: 160.5, unit: 'cm' });
  });

  it('clears <input /> value if null is given as new prop', () => {
    const wrapper = shallow(
      <TextUnitInputComponent
        value={{ value: 160, unit: 'cm' }}
        units={['cm']}
      />
    );

    const getInput = () => wrapper.find('input').at(0);

    expect(getInput().prop('value')).toEqual('160');

    wrapper.setProps({ value: null });
    expect(getInput().prop('value')).toEqual('');
  });
});
