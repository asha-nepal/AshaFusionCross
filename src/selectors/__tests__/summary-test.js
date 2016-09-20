/* eslint-env jest */

jest.unmock('lodash.get');
jest.unmock('../summary');

import {
  flattenRow,
  tablize,
} from '../summary';

describe('flattenRow()', () => {
  it('converts object containing nested fields to flattened object', () => {
    const data = {
      aaa: {
        foo: 'bar',
        hoge: 'fuga',
      },
      bbb: 'ccc',
    };

    const columns = [
      { field: 'aaa.foo' },
      { field: 'aaa.hoge' },
      { field: 'bbb' },
    ];

    expect(flattenRow(data, columns))
      .toEqual({
        'aaa.foo': 'bar',
        'aaa.hoge': 'fuga',
        bbb: 'ccc',
      });
  });
});

describe('tablize()', () => {
  it('converts array of objects by using flattenRow', () => {
    const data = [
      {
        aaa: {
          foo: 'bar',
          hoge: 'fuga',
        },
        bbb: 'ccc',
      },
      {
        aaa: {
          foo: 'BAR',
          hoge: 'FUGA',
        },
        bbb: 'CCC',
      },
    ];

    const columns = [
      { field: 'aaa.foo' },
      { field: 'aaa.hoge' },
      { field: 'bbb' },
    ];

    expect(tablize(data, columns))
      .toEqual([
        {
          'aaa.foo': 'bar',
          'aaa.hoge': 'fuga',
          bbb: 'ccc',
        },
        {
          'aaa.foo': 'BAR',
          'aaa.hoge': 'FUGA',
          bbb: 'CCC',
        },
      ]);
  });
});
