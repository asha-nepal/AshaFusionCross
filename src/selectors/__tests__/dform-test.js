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

jest.unmock('immutable');
jest.unmock('reselect');
jest.unmock('deep-freeze');
jest.unmock('../dform');

import Immutable from 'immutable';
import deepFreeze from 'deep-freeze';
import {
  getRecordFormStyleId,
  getViewableRecordFormStyles,
} from '../dform';
import {
  getIsAdmin,
  getUserRoles,
} from '../auth';

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

describe('getViewableRecordFormStyles', () => {
  let state;

  beforeEach(() => {
    const recordFormStyles = [
      {
        id: 'reception',
        roles: ['reception'],
      },
      {
        id: 'physician',
        roles: ['physician'],
      },
      {
        id: 'free',
        roles: null,
      },
    ];
    state = { dform: { styles: Immutable.fromJS({ record: recordFormStyles }) } };
    deepFreeze(state);
  });

  [
    [['reception'], ['reception', 'free']],
    [[], ['free']],
    [null, ['free']],
  ].forEach(([userRoles, expectedViewableStyleIds]) => {
    it(`returns ${expectedViewableStyleIds} for a user whose roles are ${userRoles}`, () => {
      getIsAdmin.mockReturnValue(false);
      getUserRoles.mockReturnValue(userRoles);

      expect(getViewableRecordFormStyles(state).map(style => style.get('id')))
        .toEqual(Immutable.fromJS(expectedViewableStyleIds));
    });
  });

  it('returns all styles for admin user', () => {
    getIsAdmin.mockReturnValue(true);

    expect(getViewableRecordFormStyles(state).map(style => style.get('id')))
      .toEqual(Immutable.fromJS(['reception', 'physician', 'free']));
  });
});
