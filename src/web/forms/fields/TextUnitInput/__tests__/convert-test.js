/**
 * Copyright 2018 Yuichiro Tsuchiya
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

jest.disableAutomock();

import convert from '../convert';

describe('convert()', () => {
  it('converts unit', () => {
    const value = {
      value: '180',
      unit: 'cm',
    };
    const targetUnit = 'in';

    expect(convert(value, targetUnit)).toEqual(70.86614173228347);
  });

  it('returns null with invalid input given', () => {
    const value = null;
    const targetUnit = 'in';

    expect(convert(value, targetUnit)).toBe(null);
  });

  it('returns input value directly if given units are the same', () => {
    const value = {
      value: '70',
      unit: 'in',
    };
    const targetUnit = 'in';

    expect(convert(value, targetUnit)).toEqual(70);
  });

  describe('with conversion between units which have different bases', () => {
    [
      [{ value: 1, unit: 'mmol/L' }, 'mg/dL', 'glucose', 18.015588],
      [{ value: 1, unit: 'mmol/L' }, 'mg/dL', 'cholesterol', 38.665354],
      [{ value: 1, unit: 'mg/dL' }, 'mmol/L', 'glucose', 1 / 18.015588],
      [{ value: 1, unit: 'mg/dL' }, 'mmol/L', 'cholesterol', 1 / 38.665354],
    ].forEach(([value, targetUnit, coefficient, expected]) => {
      it(`converts mg/dl to mmol/L in case of ${coefficient}`, () => {
        expect(convert(value, targetUnit, coefficient)).toBeCloseTo(expected, 10e-10);
      });
    });
  });
});
