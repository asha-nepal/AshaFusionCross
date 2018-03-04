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
jest.unmock('../count-rank');

import countRank from '../count-rank';

describe('countRank()', () => {
  it('returns count rank when Array given', () => {
    const data = ['a', 'b', 'b', 'c', 'c', 'c'];

    const expected = [
      [['a'], 1],
      [['b'], 2],
      [['c'], 3],
    ];

    expect(countRank(data))
      .toEqual(expected);
  });

  it('returns count rank when Array<Array> given', () => {
    const data = [
      ['foo'],
      ['foo', 'bar', 'baz'],
      ['foo', 'bar', 'baz', 'hoge'],
      ['foo', 'bar', 'baz', 'hoge', 'fuga'],
    ];

    const expected = [
      [['fuga'], 1],
      [['hoge'], 2],
      [['bar', 'baz'], 3],
      [['foo'], 4],
    ];

    expect(countRank(data))
      .toEqual(expected);
  });

  it('returns a result in desc order if the flag speficied', () => {
    const data = ['a', 'b', 'b', 'c', 'c', 'c'];

    const expected = [
      [['c'], 3],
      [['b'], 2],
      [['a'], 1],
    ];

    expect(countRank(data, false))
      .toEqual(expected);
  });
});
