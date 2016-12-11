/* eslint-env jest */

jest.unmock('reselect');
jest.unmock('deep-freeze');
jest.unmock('../dform');

import deepFreeze from 'deep-freeze';
import {
  getRecordFormStyleId,
} from '../dform';

describe('getRecordFormStyleId', () => {
  it('selects recordFormStyleId', () => {
    const state = {
      patientView: {
        recordFormStyleId: 'dummystyleid',
      },
    };

    deepFreeze(state);

    expect(getRecordFormStyleId(state))
      .toEqual('dummystyleid');
  });
});
