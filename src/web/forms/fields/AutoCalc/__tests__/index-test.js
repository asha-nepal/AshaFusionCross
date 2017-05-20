/* eslint-env jest */

jest.unmock('react-redux');
jest.unmock('lodash.get');
jest.unmock('../index');

import { shallow } from 'enzyme';
import React from 'react';
import { AutoCalcComponent, getValue } from '../index';

describe('<AutoCalcComponent />', () => {
  it('shows value with given precision', () => {
    const wrapper = shallow(
      <AutoCalcComponent
        value={1.234567}
        precision={2}
      />
    );

    expect(wrapper.find('span').first().text())
      .toEqual('1.23');
  });

  it('shows nothing if value is null', () => {
    const wrapper = shallow(
      <AutoCalcComponent
        value={null}
        precision={2}
      />
    );

    expect(wrapper.find('span').first().text())
      .toEqual('');
  });
});

describe('getValue', () => {
  it('applies given arguments to specified function', () => {
    const targetModel = {
      foo: 100,
      bar: 20,
      baz: {
        yo: 30,
        ho: 40,
      },
    };

    const calc = (arg1, arg2) => arg1 + arg2;

    expect(getValue(targetModel, ['foo', 'bar'], calc))
      .toEqual(120);

    expect(getValue(targetModel, ['baz.yo', 'baz.ho'], calc))
      .toEqual(70);

    expect(getValue(targetModel, ['baz.yo', 'hoge'], calc))
      .toBe(null);
  });

  it('returns null if targetModel is not object', () => {
    const argKeys = [];
    const calc = () => 100;

    expect(getValue(null, argKeys, calc)).toBe(null);
    expect(getValue(0, argKeys, calc)).toBe(null);
  });

  it('returns null if calc is not callable', () => {
    expect(getValue({}, [], null)).toBe(null);
  });
});
