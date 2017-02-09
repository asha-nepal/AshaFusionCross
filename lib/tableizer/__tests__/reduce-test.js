/* eslint-env jest */

jest.unmock('../reduce');
jest.unmock('mathjs/core');
jest.unmock('mathjs/lib/type/unit');
jest.unmock('mathjs/lib/function/statistics');
jest.unmock('lib/mathjs');

import {
  transposeTable,
  reduce,
  reduceTable,
} from '../reduce';

describe('reduce()', () => {
  it('summarizes array', () => {
    const col = [170, 178, 180];
    const rule = { type: 'mean' };

    const expected = 176;

    expect(reduce(col, rule))
      .toEqual(expected);
  });

  it('ignores empty array', () => {
    const col = [];
    const rule = { type: 'mean' };

    const expected = null;

    expect(reduce(col, rule))
      .toEqual(expected);
  });

  it('ignores null value by default', () => {
    const col = [170, 178, 180, null, undefined];
    const rule = { type: 'mean' };

    const expected = 176;

    expect(reduce(col, rule))
      .toEqual(expected);
  });

  it('can be configured not to ignore null value and replace it with another', () => {
    const col = [170, 178, 180, null, undefined];
    const rule = { type: 'mean' };

    const expected = 109.6;

    expect(reduce(col, rule, 10))
      .toEqual(expected);
  });

  it('can take an array of non-number value', () => {
    const col = ['foo', 'foo', 'foo', 'bar', 'bar'];
    const rule = { type: 'mode' };

    const expected = ['foo'];

    expect(reduce(col, rule))
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
});
