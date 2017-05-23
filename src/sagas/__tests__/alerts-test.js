/* eslint-env jest */

jest.unmock('../alerts');
import { getId } from '../alerts';

describe('getId()', () => {
  it('returns incremental ID', () => {
    expect(getId()).toBe(0);
    expect(getId()).toBe(1);
    expect(getId()).toBe(2);
  });
});
