/* eslint-env jest */

jest.unmock('../as-array');

import {
  asArray,
} from '../as-array';

describe('asArray()', () => {
  it('returns input as it is if an array', () => {
    expect(asArray([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('converts scalar value to an array which contains it', () => {
    expect(asArray(42)).toEqual([42]);
  });

  it('converts null and undefined to an empty array', () => {
    expect(asArray(null)).toEqual([]);
    expect(asArray(undefined)).toEqual([]);
  });
});
