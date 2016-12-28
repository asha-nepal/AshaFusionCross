/* eslint-env jest */

jest.unmock('../../../../actions');
jest.unmock('../../../../actions/dform');
jest.unmock('lodash.topath');
jest.unmock('immutable');
jest.unmock('../styles');

import Immutable from 'immutable';

import {
  dformStyleFieldInsert,
  dformStyleFieldUpdate,
  dformStyleFieldRemove,
  dformStyleFieldMove,
  dformStyleFormAdd,
} from '../../../../actions';

import reducer from '../styles';

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

    const action = dformStyleFieldInsert(
      'record',
      'form01',
      '[0].children',
      1,
      { class: 'textunitinput', label: 'XXX' }
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

    const action = dformStyleFieldUpdate(
      'record',
      'form01',
      '[0].children',
      1,
      { class: 'textunitinput', label: 'XXX' }
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

    const action = dformStyleFieldUpdate(
      'record',
      'form01',
      '[0].children',
      1,
      { class: 'textunitinput' },
      true
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

    const action = dformStyleFieldRemove(
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

    const action = dformStyleFieldMove(
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

    const action = dformStyleFieldMove(
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

    const action = dformStyleFieldMove(
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

    const action = dformStyleFieldMove(
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

    const action = dformStyleFieldMove(
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

    const action = dformStyleFieldMove(
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
