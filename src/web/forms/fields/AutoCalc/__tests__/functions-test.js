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

describe('asha:sum', () => {
  const func = functions['asha:sum'];

  it('calculates sum of arbitrary list of args', () => {
    expect(func(1)).toEqual(1);
    expect(func(-1, 1)).toEqual(0);
    expect(func(1, 2, 3)).toEqual(6);
  });

  it('calculates reasonable sum for numerical/coerceable args', () => {
    expect(func(0)).toEqual(0);
    expect(func(1, 1.0)).toEqual(2.0);
    expect(func(3.5, 1.5)).toEqual(5.0);
    expect(func('1', 1.0)).toEqual(2.0);
  });

  it('adds together nothing if no arg/nullarg & turns into number (0)', () => {
    // Nullarg
    expect(func(null)).toBe(null);
    // Undefined
    expect(func()).toEqual(null);
  });

  it('adds numbers even if strings', () => {
    // String
    expect(func('1')).toEqual(1);
    expect(func('1', 2)).toEqual(3);
    expect(func(1, '2')).toEqual(3);
    expect(func('1', '2')).toEqual(3);
  });
});
