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
jest.unmock('actions');
jest.unmock('actions/pouch-docs');
jest.unmock('../generator');

import {
  successFetchingPouchDocs,
} from '../../../actions';
import {
  generatePouchDocsReducer,
} from '../generator';

describe('generatePouchDocsReducer()', () => {
  describe('generates reducer and it', () => {
    it('takes POUCH_DOCS_FETCH_SUCCESS action and updates its state', () => {
      const stateBefore = [];

      const action = successFetchingPouchDocs('hoge', [
        { id: 'foo', type: 'some_type' },
        { id: 'bar', type: 'some_type' },
      ]);

      const hogeReducer = generatePouchDocsReducer('hoge');
      const fugaReducer = generatePouchDocsReducer('fuga');

      expect(hogeReducer(stateBefore, action))
        .toEqual([
          { id: 'foo', type: 'some_type' },
          { id: 'bar', type: 'some_type' },
        ]);

      expect(fugaReducer(stateBefore, action))
        .toBe(stateBefore);
    });
  });
});
