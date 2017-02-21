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
