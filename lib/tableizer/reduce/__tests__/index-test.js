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

jest.unmock('../index');
jest.unmock('mathjs/core');
jest.unmock('mathjs/lib/type/unit');
jest.unmock('mathjs/lib/function/statistics');
jest.unmock('lib/mathjs');

import {
  transposeTable,
  reduce,
  reduceTable,
} from '../index';
import countRank from '../count-rank';

describe('reduce()', () => {
  [
    [
      [170, 178, 180], { type: 'mean' },
      176,
    ],
    [  // ignores empty array
      [], { type: 'mean' },
      null,
    ],
    [  // ignores null array
      [null, null], { type: 'mean' },
      null,
    ],
    [  // ignores invalid combination of value type and reduce function
      ['hoge', 'fuga'], { type: 'mean' },
      null,
    ],
    [  // ignores null value by default
      [170, 178, 180, null, undefined], { type: 'mean' },
      176,
    ],
    [  // can take an array of non-number value
      ['foo', 'foo', 'foo', 'bar', 'bar'], { type: 'mode' },
      ['foo'],
    ],
  ].forEach(([col, rule, expected]) => {
    it('summarizes array', () => {
      expect(reduce(col, rule))
        .toEqual(expected);
    });
  });

  it('can be configured not to ignore null value and replace it with another', () => {
    const col = [170, 178, 180, null, undefined];
    const rule = { type: 'mean' };

    const expected = 109.6;

    expect(reduce(col, rule, 10))
      .toEqual(expected);
  });
});

describe('transposeTable()', () => {
  it('converts Array<Object> to column wise', () => {
    const data = [
      { height: 170, weight: 60, foo: 'bar' },
      { height: 175, weight: 65, foo: 'yo' },
      { height: 180, weight: 70, foo: 'ho' },
    ];

    const expected = {
      height: [170, 175, 180],
      weight: [60, 65, 70],
    };

    expect(transposeTable(data, ['height', 'weight']))
      .toEqual(expected);
  });
});

describe('reduceTable()', () => {
  it('summarizes tableized data', () => {
    const data = [
      { height: 170, weight: 65 },
      { height: 178, weight: 66 },
      { height: 180, weight: 67 },
    ];

    const rules = {
      'height.mean': {
        entry: 'height',
        type: 'mean',
      },
      'height.max': {
        entry: 'height',
        type: 'max',
      },
      weight: {
        type: 'mean',
      },
    };

    const expected = { 'height.mean': 176, 'height.max': 180, weight: 66 };

    expect(reduceTable(data, rules))
      .toEqual(expected);
  });

  it('calls `countRank` if type=`rank` specified', () => {
    const data = [
      { age: 10 },
      { age: 10 },
      { age: 10 },
    ];

    const rules = {
      age: {
        type: 'rank',
      },
    };

    reduceTable(data, rules);

    expect(countRank).toBeCalledWith([10, 10, 10], true);
  });

  it('calls `countRank` if type=`rank` specified and desc flag if specified', () => {
    const data = [
      { age: 10 },
      { age: 10 },
      { age: 10 },
    ];

    const rules = {
      age: {
        type: 'rank',
        order: 'desc',
      },
    };

    reduceTable(data, rules);

    expect(countRank).toBeCalledWith([10, 10, 10], false);
  });
});
