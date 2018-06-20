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

jest.unmock('lodash.get');
jest.unmock('../utils');

import { referAndGetBool } from '../utils';

describe('referAndGetBool', () => {
  it('returns false if orgProp is false', () => {
    expect(referAndGetBool({}, 'hoge', false)).toBe(false);
  });

  it('returns true if orgProp is true', () => {
    expect(referAndGetBool({}, 'hoge', true)).toBe(true);
  })

  it('returns defaultValue if orgProp is undefined', () => {
    expect(referAndGetBool({}, 'hoge', undefined)).toBe(true);
    expect(referAndGetBool({}, 'hoge', undefined, true)).toBe(true);
    expect(referAndGetBool({}, 'hoge', undefined, false)).toBe(false);
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

    expect(referAndGetBool(state, 'root', 'foo.bar')).toBe(true);
    expect(referAndGetBool(state, 'root', 'hoge.fuga')).toBe(false);
  });

  it('handles Array as referent', () => {
    const state = {
      root: {
        foo: ['aaa', 'zzz'],
      },
    };

    expect(referAndGetBool(state, 'root', 'foo:aaa')).toBe(true);
    expect(referAndGetBool(state, 'root', 'foo:bbb')).toBe(false);
  });

  it('handles an empty array as falthy', () => {
    const state = {
      root: {
        foo: [],
      },
    };

    expect(referAndGetBool(state, 'root', 'foo')).toBe(false);
  });

  it('handles empty rootPath', () => {
    const state = {
      foo: true,
      hoge: {
        foo: false,
      },
    };

    expect(referAndGetBool(state, null, 'foo')).toBe(true);
    expect(referAndGetBool(state, 'hoge', 'foo')).toBe(false);
  });

  it('handles OR condition', () => {
    const state = {
      root: {
        foo: false,
        bar: true,
      },
    };

    expect(referAndGetBool(state, 'root', 'foo|bar')).toBe(true);
  });

  it('handles negative', () => {
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

    expect(referAndGetBool(state, 'root', '!foo.bar')).toBe(false);
    expect(referAndGetBool(state, 'root', '!hoge.fuga')).toBe(true);
  });

  it('handles negative on Array referent', () => {
    const state = {
      root: {
        foo: ['aaa', 'zzz'],
      },
    };

    expect(referAndGetBool(state, 'root', '!foo:aaa')).toBe(false);
    expect(referAndGetBool(state, 'root', '!foo:bbb')).toBe(true);
  });
});
