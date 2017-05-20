/* eslint-env jest */

jest.unmock('mathjs/core');
jest.unmock('mathjs/lib/type/unit');
jest.unmock('mathjs/lib/function/statistics');
jest.unmock('lib/mathjs');
jest.unmock('../functions');

import functions from '../functions';

describe('asha:bmi', () => {
  it('calculates BMI', () => {
    const func = functions['asha:bmi'];

    const height = {
      value: 178,
      unit: 'cm',
    };

    const weight = {
      value: 68,
      unit: 'kg',
    };

    expect(func(height, weight))
      .toBeCloseTo(21.46);
  });
});
