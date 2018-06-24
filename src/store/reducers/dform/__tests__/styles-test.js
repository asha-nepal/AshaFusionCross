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

import Immutable from 'immutable';

import {
  insertDformStyleField,
  updateDformStyleField,
  removeDformStyleField,
  moveDformStyleField,
  dformStyleFormAdd,
  setDformStyleForm,
} from '../../../../actions';

import reducer from '../styles';

jest.unmock('../../../../actions');
jest.unmock('../../../../actions/dform');
jest.unmock('lodash.topath');
jest.unmock('immutable');
jest.unmock('../styles');

describe('DFORM_STYLE_FIELD_INSERT', () => {
  it('inserts field', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text1' },
                { class: 'textinput', label: 'text2' },
              ],
            },
          ],
        },
      ],
    });

    const action = insertDformStyleField(
      'record',
      'form01',
      '[0].children',
      1,
      { class: 'textunitinput', label: 'XXX' },
    );

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textunitinput', label: 'XXX' },
                { class: 'textinput', label: 'text1' },
                { class: 'textinput', label: 'text2' },
              ],
            },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  it('inserts field into empty field', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
            },
          ],
        },
      ],
    });

    const action = insertDformStyleField(
      'record',
      'form01',
      '[0].children',
      0,
      { class: 'textunitinput', label: 'XXX' },
    );

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textunitinput', label: 'XXX' },
              ],
            },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});

describe('DFORM_STYLE_FIELD_UPDATE', () => {
  it('updates field', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text1' },
                { class: 'textinput', label: 'text2' },
              ],
            },
          ],
        },
      ],
    });

    const action = updateDformStyleField(
      'record',
      'form01',
      '[0].children',
      1,
      { class: 'textunitinput', label: 'XXX' },
    );

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textunitinput', label: 'XXX' },
                { class: 'textinput', label: 'text2' },
              ],
            },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  it('merges field if specified', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text1' },
                { class: 'textinput', label: 'text2' },
              ],
            },
          ],
        },
      ],
    });

    const action = updateDformStyleField(
      'record',
      'form01',
      '[0].children',
      1,
      { class: 'textunitinput' },
      true,
    );

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textunitinput', label: 'text1' },
                { class: 'textinput', label: 'text2' },
              ],
            },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});

describe('DFORM_STYLE_FIELD_REMOVE', () => {
  it('deletes field', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text1' },
                { class: 'textinput', label: 'text2' },
              ],
            },
          ],
        },
      ],
    });

    const action = removeDformStyleField(
      'record',
      'form01',
      '[0].children',
      1,
    );

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text2' },
              ],
            },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});

describe('DFORM_STYLE_FIELD_MOVE', () => {
  it('moves field backward', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text1' },
              ],
            },
          ],
        },
      ],
    });

    const action = moveDformStyleField(
      'record',
      'form01',
      '[0].children',
      0,
      '',
      0,
    );

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            { class: 'textinput', label: 'text0' },
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text1' },
              ],
            },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  it('moves field forward', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            { class: 'textinput', label: 'text0' },
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text1' },
              ],
            },
          ],
        },
      ],
    });

    const action = moveDformStyleField(
      'record',
      'form01',
      '',
      0,
      '[1].children',
      0,
    );

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text1' },
              ],
            },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  it('keeps position if (toPath, toIndex) and (fromPath, fromIndex) are the same', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text1' },
              ],
            },
          ],
        },
      ],
    });

    const action = moveDformStyleField(
      'record',
      'form01',
      '[0].children',
      0,
      '[0].children',
      0,
    );

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text1' },
              ],
            },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  it('keeps position if (toPath, toIndex) specifies just after (fromPath, fromIndex)', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text1' },
              ],
            },
          ],
        },
      ],
    });

    const action = moveDformStyleField(
      'record',
      'form01',
      '[0].children',
      0,
      '[0].children',
      1,
    );

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text1' },
              ],
            },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  it('works in case where (toPath, toIndex) specifies just before (fromPath, fromIndex)', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text1' },
              ],
            },
          ],
        },
      ],
    });

    const action = moveDformStyleField(
      'record',
      'form01',
      '[0].children',
      1,
      '[0].children',
      0,
    );

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text1' },
                { class: 'textinput', label: 'text0' },
              ],
            },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  it('can moves field under the same parent', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text0' },
                { class: 'textinput', label: 'text1' },
              ],
            },
          ],
        },
      ],
    });

    const action = moveDformStyleField(
      'record',
      'form01',
      '[0].children',
      0,
      '[0].children',
      2,
    );

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            {
              class: 'block',
              children: [
                { class: 'textinput', label: 'text1' },
                { class: 'textinput', label: 'text0' },
              ],
            },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});


describe('DFORM_STYLE_FORM_ADD', () => {
  it('adds new form', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            { class: 'textinput', label: 'text0' },
            { class: 'textinput', label: 'text1' },
          ],
        },
      ],
    });

    const action = dformStyleFormAdd('record', 'form02', 'NEW FORM');

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            { class: 'textinput', label: 'text0' },
            { class: 'textinput', label: 'text1' },
          ],
        },
        {
          id: 'form02',
          label: 'NEW FORM',
          style: [],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  it('does not add new form if id already exists', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            { class: 'textinput', label: 'text0' },
            { class: 'textinput', label: 'text1' },
          ],
        },
      ],
    });

    const action = dformStyleFormAdd('record', 'form01', 'NEW FORM');

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          style: [
            { class: 'textinput', label: 'text0' },
            { class: 'textinput', label: 'text1' },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});

describe('DFORM_STYLE_FORM_SET', () => {
  it('sets new form if not exists', () => {
    const stateBefore = Immutable.fromJS({
      record: [],
    });

    const action = setDformStyleForm('record', 'form01', 'NEW FORM', [
      { field: 'foo', class: 'textinput' },
      { field: 'bar', class: 'textinput' },
    ]);

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          label: 'NEW FORM',
          style: [
            { field: 'foo', class: 'textinput' },
            { field: 'bar', class: 'textinput' },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  it('updates specified form if exists', () => {
    const stateBefore = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          label: 'EXISTING FORM',
          style: [
            { field: 'baz', class: 'textunitinput' },
          ],
        },
      ],
    });

    const action = setDformStyleForm('record', 'form01', 'UPDATED FORM', [
      { field: 'foo', class: 'textinput' },
      { field: 'bar', class: 'textinput' },
    ]);

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          label: 'UPDATED FORM',
          style: [
            { field: 'foo', class: 'textinput' },
            { field: 'bar', class: 'textinput' },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  it('sets new group and form if not exists', () => {
    const stateBefore = Immutable.fromJS({});

    const action = setDformStyleForm('record', 'form01', 'NEW FORM', [
      { field: 'foo', class: 'textinput' },
      { field: 'bar', class: 'textinput' },
    ]);

    const stateAfter = Immutable.fromJS({
      record: [
        {
          id: 'form01',
          label: 'NEW FORM',
          style: [
            { field: 'foo', class: 'textinput' },
            { field: 'bar', class: 'textinput' },
          ],
        },
      ],
    });

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});
