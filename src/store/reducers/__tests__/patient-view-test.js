/* eslint-env jest */

jest.unmock('../../../actions');
jest.unmock('../patient-view');

import deepFreeze from 'deep-freeze';

import {
  selectActiveRecord,
} from '../../../actions';
import reducer from '../patient-view';

describe('SELECT_ACTIVE_RECORD', () => {
  it('updates selectedActiveRecordId', () => {
    const stateBefore = {
      selectedActiveRecordId: null,
    };
    const action = selectActiveRecord('dummyrecordid');

    const stateAfter = {
      selectedActiveRecordId: 'dummyrecordid',
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});
