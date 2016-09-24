/* eslint-env jest */

jest.unmock('../form');

import { getDirtyIndices } from '../form';

describe('getDirtyIndices()', () => {
  it('returns dirty indices of array form state', () => {
    const formState = {
      fields: {
        3: {
          pristine: false,
        },
        '5.height': {
          pristine: false,
        },
        '7.weight': {
          pristine: true,
        },
        '9.waist': {
          pristine: false,
        },
        '11.height': {
          pristine: false,
        },
        '11.weight': {
          pristine: true,
        },
        '11.waist': {
          pristine: false,
        },
      },
    };

    expect(getDirtyIndices(formState))
      .toEqual([3, 5, 9, 11]);
  });

  it('handles empty data', () => {
    const formState = {
      fields: {},
    };

    expect(getDirtyIndices(formState))
      .toEqual([]);
  });

  it('handles fields all which are pristine', () => {
    const formState = {
      fields: {
        '1.height': {
          pristine: true,
        },
        '2.height': {
          pristine: true,
        },
        '2.weight': {
          pristine: true,
        },
      },
    };

    expect(getDirtyIndices(formState))
      .toEqual([]);
  });
});
