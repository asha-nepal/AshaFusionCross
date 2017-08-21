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

jest.unmock('../tableize');
jest.unmock('lodash.get');
jest.unmock('mathjs/core');
jest.unmock('mathjs/lib/type/unit');
jest.unmock('mathjs/lib/function/statistics');
jest.unmock('lib/mathjs');
jest.unmock('moment');

import moment from 'moment';
import {
  tableize,
} from '../tableize';

describe('tableize()', () => {
  it('converts tree structure like json to table structure with some rules', () => {
    const data = [
      {
        name: 'John',
        height: {
          value: 5.8,
          unit: 'ft',
        },
        bp: {
          s: 120,
          d: 90,
        },
      },
      {
        name: 'Alex',
        height: {
          value: 180,
          unit: 'cm',
        },
        bp: {
          s: 125,
          d: 85,
        },
      },
      {
        name: 'Mike',
        height: {
          value: 1.78,
          unit: 'm',
        },
        bp: {
          s: 130,
          d: 80,
        },
      },
      {},
    ];

    const rules = [
      {
        key: 'name',
      },
      {
        key: 'bp_s',
        entry: 'bp.s',
      },
      {
        key: 'height',
        type: 'value_unit',
        unit: 'm',
      },
    ];

    const expected = [
      { name: 'John', bp_s: 120, height: 1.76784 },
      { name: 'Alex', bp_s: 125, height: 1.8 },
      { name: 'Mike', bp_s: 130, height: 1.78 },
      { name: null, bp_s: null, height: null },
    ];

    expect(tableize(data, rules))
      .toEqual(expected);
  });

  it('can handle time format', () => {
    const data = [
      { unixtimems: 1486000000000 },
    ];

    const rules = [
      { key: 'unixtimems', type: 'moment', format: 'dddd, MMMM Do YYYY, h:mm:ss a Z' },
      { key: 'unixtimems_iso', entry: 'unixtimems', type: 'moment' },
    ];

    // FIXME: It is not so good to use moment().format() to represent expected values
    const expected = [
      {
        unixtimems: moment(1486000000000).format('dddd, MMMM Do YYYY, h:mm:ss a Z'),
        unixtimems_iso: moment(1486000000000).format(),
      },
    ];

    expect(tableize(data, rules))
      .toEqual(expected);
  });

  it('can configure the default value applied to null output', () => {
    const data = [
      {},
    ];

    const rules = [
      { key: 'foo' },
    ];

    const nullValue = 'NULL';

    const expected = [
      { foo: 'NULL' },
    ];

    expect(tableize(data, rules, nullValue))
      .toEqual(expected);
  });

  it('plucks', () => {
    const data = [
      { foo: [
        { bar: 'bar', baz: 'baz' },
        { bar: 'Bar', baz: 'Baz' },
        { hoge: 'fuga' },
      ] },
      { foo: [
        { bar: 'BAr', baz: 'BAz' },
        { bar: 'BAR', baz: 'BAZ' },
      ] },
    ];

    const rules = [
      { key: 'foo_bar', entry: 'foo', pluck: 'bar' },
    ];

    const expected = [
      { foo_bar: ['bar', 'Bar'] },
      { foo_bar: ['BAr', 'BAR'] },
    ];

    expect(tableize(data, rules))
      .toEqual(expected);
  });
});
