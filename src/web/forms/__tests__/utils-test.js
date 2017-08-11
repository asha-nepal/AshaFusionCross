/**
 * Copyright 2016 Yuichiro Tsuchiya
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
