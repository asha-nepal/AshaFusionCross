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

jest.unmock('mathjs/core');
jest.unmock('mathjs/lib/type/unit');
jest.unmock('mathjs/lib/function/statistics');
jest.unmock('lib/mathjs');
jest.unmock('../functions');

import functions from '../functions';

describe('asha:bmi', () => {
  [
    [{ value: 178, unit: 'cm' }, { value: 68, unit: 'kg' }, 21.46],
    [{ value: 178.5, unit: 'cm' }, { value: 68, unit: 'kg' }, 21.34],
    [{ value: 178, unit: 'cm' }, { value: 68.5, unit: 'kg' }, 21.62],
    [{ value: 178.5, unit: 'cm' }, { value: 68.5, unit: 'kg' }, 21.50],
  ].forEach(([height, weight, expected]) => {
    it(`calculates BMI (height: ${height.value} ${height.unit}, weight: ${weight.value} ${weight.unit})`, () => { // eslint-disable-line max-len
      const func = functions['asha:bmi'];

      expect(func(height, weight))
        .toBeCloseTo(expected);
    });
  });
});

describe('asha:math:mul', () => {
  const func = functions['asha:math:mul'];

  it('multiplies arbitrary number of inputs', () => {
    // Integer
    expect(func(1)).toEqual(1);
    expect(func(1, 2)).toEqual(2);
    expect(func(1, 2, 3)).toEqual(6);
    expect(func(1, 2, 3, 4)).toEqual(24);

    // With zero
    expect(func(0)).toEqual(0);
    expect(func(0, 1)).toEqual(0);
    expect(func(0, 1, 2)).toEqual(0);

    // Decimal
    expect(func(1.5)).toEqual(1.5);
    expect(func(1.5, 2.5)).toEqual(3.75);
    expect(func(0, 1.5)).toEqual(0);

    // Negative
    expect(func(-1)).toEqual(-1);
    expect(func(-1, -2)).toEqual(2);
    expect(func(-1, -2, -3)).toEqual(-6);
    expect(func(-1, -2, -3, -4)).toEqual(24);
  });

  it('can accept string', () => {
    expect(func('1')).toEqual(1);
    expect(func('1', 2)).toEqual(2);
    expect(func(1, '2')).toEqual(2);
    expect(func('1', '2')).toEqual(2);

    expect(func('0')).toEqual(0);
    expect(func('0', 1)).toEqual(0);
    expect(func(0, '1')).toEqual(0);
    expect(func('0', '1')).toEqual(0);

    expect(func('1.5')).toEqual(1.5);
    expect(func('1.5', 2.5)).toEqual(3.75);
    expect(func(1.5, '2.5')).toEqual(3.75);
    expect(func('1.5', '2.5')).toEqual(3.75);

    expect(func('-1')).toEqual(-1);
    expect(func('-1', -2)).toEqual(2);
    expect(func(-1, '-2')).toEqual(2);
    expect(func('-1', '-2')).toEqual(2);
  });

  it('returns null if input is empty', () => {
    expect(func()).toEqual(null);
  });
});
