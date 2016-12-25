/* eslint-env jest */

jest.unmock('lodash.get');
jest.unmock('../utils');

import { checkVisibility } from '../utils';

describe('checkVisibility', () => {
  it('returns false if `show` prop is false', () => {
    expect(checkVisibility({}, 'hoge', false)).toBe(false);
  });

  it('returns referred value if show prop is given as string', () => {
    const state = {
      root: {
        foo: {
          bar: true,
        },
        hoge: {
          fuga: false,
        },
      },
    };

    expect(checkVisibility(state, 'root', 'foo.bar')).toBe(true);
    expect(checkVisibility(state, 'root', 'hoge.fuga')).toBe(false);
  });

  it('handles Array as referent', () => {
    const state = {
      root: {
        foo: ['aaa', 'zzz'],
      },
    };

    expect(checkVisibility(state, 'root', 'foo:aaa')).toBe(true);
    expect(checkVisibility(state, 'root', 'foo:bbb')).toBe(false);
  });

  it('handles empty rootPath', () => {
    const state = {
      foo: true,
      hoge: {
        foo: false,
      },
    };

    expect(checkVisibility(state, null, 'foo')).toBe(true);
    expect(checkVisibility(state, 'hoge', 'foo')).toBe(false);
  });

  it('handles OR condition', () => {
    const state = {
      root: {
        foo: false,
        bar: true,
      },
    };

    expect(checkVisibility(state, 'root', 'foo|bar')).toBe(true);
  });
});
