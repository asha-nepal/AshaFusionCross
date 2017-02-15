/* eslint-env jest */
jest.unmock('../../../actions');
jest.unmock('../../../actions/pouch-docs');
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
