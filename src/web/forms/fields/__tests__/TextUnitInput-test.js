/* eslint-env jest */

jest.unmock('react-redux');
jest.unmock('../TextUnitInput');

import math from 'mathjs';

import { convert } from '../TextUnitInput';

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
});
