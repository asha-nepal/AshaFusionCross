/* eslint-env jest */

jest.unmock('react-redux');
jest.unmock('../ICD10Input');

import { getSuggestions } from '../ICD10Input';
import deepFreeze from 'deep-freeze';

describe('getSuggestions()', () => {
  it('does forward matching and accepts multiple queries', () => {
    const ICD10 = [
      { code: 'A10', description: 'hoge hoge' },
      { code: 'A11', description: 'hoge fuga' },
      { code: 'A20', description: 'fuga hoge' },
      { code: 'A21', description: 'fuga fuga' },
      { code: 'B10', description: 'foo foo' },
      { code: 'B11', description: 'foo bar' },
    ].map(item => ({
      ...item,
      _query: ` ${item.code} ${item.description}`.toLowerCase(),
    }));

    deepFreeze(ICD10);

    expect(getSuggestions(ICD10, 'hoge').map(s => s.code))
      .toEqual([
        'A10',
        'A11',
        'A20',
      ]);

    expect(getSuggestions(ICD10, 'a1 hoge').map(s => s.code))
      .toEqual([
        'A10',
        'A11',
      ]);

    expect(getSuggestions(ICD10, 'b').map(s => s.code))
      .toEqual([
        'B10',
        'B11',
      ]);
  });
});
