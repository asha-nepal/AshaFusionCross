/* eslint-env jest */

jest.unmock('../index');
jest.unmock('lodash.get');
jest.unmock('mathjs/core');
jest.unmock('mathjs/lib/type/unit');
jest.unmock('lib/mathjs');

import {
  tableize,
} from '../index';

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
    ];

    expect(tableize(data, rules))
      .toEqual(expected);
  });
});
