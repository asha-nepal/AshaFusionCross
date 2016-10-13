/* eslint-env jest */

jest.unmock('react-redux');
jest.unmock('../TextUnitInput');

import React from 'react';
import { shallow } from 'enzyme';
import math from 'mathjs';

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
});
