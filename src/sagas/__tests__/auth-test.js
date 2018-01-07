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

jest.unmock('redux-saga/effects');
jest.unmock('../auth');
jest.unmock('../../actions');
jest.unmock('../../actions/auth');

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import PouchDB from 'lib/pouchdb';
import authedSagas from '../auth/authed-sagas';

import { afterLoggedIn } from '../auth';
import {
  loginSuccess,
} from '../../actions';

describe('afterLoggedIn()', () => {
  beforeEach(() => {
    authedSagas.returnValue = [];
  });

  it('calls db.getSession and set the returned name, roles and meta', () => {
    const db = new PouchDB();
    db.getSession = () => {
      const userCtx = { name: 'some-user-name', roles: ['role1', 'role2'] };
      return { userCtx };
    };
    db.getUser = () => {
      const meta = { foo: 'bar' };
      return { asha: meta };
    };

    return expectSaga(afterLoggedIn, db)
      .provide([
        [matchers.fork, null],
      ])
      .put(loginSuccess('some-user-name', ['role1', 'role2'], { foo: 'bar' }))
      .run();
  });

  it('calls db.getSession and set the returned name and role but not meta if name is null', () => {
    const db = new PouchDB();
    db.getSession = () => {
      const userCtx = { name: null, roles: [] };
      return { userCtx };
    };
    db.getUser = jest.fn();

    return expectSaga(afterLoggedIn, db)
      .provide([
        [matchers.fork, null],
      ])
      .not.call([db, db.getUser])
      .put(loginSuccess(null, [], null))
      .run();
  });
});
