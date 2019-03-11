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

jest.unmock('../index');

import { approximateFloat } from '../index';

describe('approximateFloat()', () => {
  [
    [1234.56789, -2, 1200],
    [1234.56789, -1, 1230],
    [1234.56789, 0, 1235],
    [1234.56789, 1, 1234.6],
    [1234.56789, 2, 1234.57],
  ].forEach(([value, precision, expected]) => {
    it(`approximates ${value} with precision ${precision}`, () => {
      expect(approximateFloat(value, precision)).toEqual(expected);
    });
  });

  it('returns the given value with no approximation if precision is null', () => {
    expect(approximateFloat(1234.56789)).toEqual(1234.56789);
    expect(approximateFloat(1234.56789, null)).toEqual(1234.56789);
    expect(approximateFloat(1234.56789, undefined)).toEqual(1234.56789);
  });

  it('returns NaN if precision is neither number nor null', () => {
    expect(approximateFloat(1234.56789, 'foo')).toEqual(NaN);
  });
});
