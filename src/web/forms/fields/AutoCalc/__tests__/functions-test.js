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

import functions from '../functions';

jest.unmock('mathjs/core');
jest.unmock('mathjs/lib/type/unit');
jest.unmock('mathjs/lib/function/statistics');
jest.unmock('lib/mathjs');
jest.unmock('../functions');

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
