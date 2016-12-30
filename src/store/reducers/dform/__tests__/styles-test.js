/* eslint-env jest */

jest.unmock('../../../../actions');
jest.unmock('../../../../actions/dform');
jest.unmock('lodash.topath');
jest.unmock('immutable');
jest.unmock('../styles');

import Immutable from 'immutable';

import {
  dformStyleInsert,
  dformStyleUpdate,
  dformStyleDelete,
  dformStyleMove,
} from '../../../../actions';

import reducer from '../styles';

describe('DFORM_STYLE_INSERT', () => {
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

    const action = dformStyleInsert(
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

    const action = dformStyleInsert(
      'record',
      'form01',
      '[0].children',
      0,
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

describe('DFORM_STYLE_UPDATE', () => {
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

    const action = dformStyleUpdate(
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

    const action = dformStyleUpdate(
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

describe('DFORM_STYLE_DELETE', () => {
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

    const action = dformStyleDelete(
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

describe('DFORM_STYLE_MOVE', () => {
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

    const action = dformStyleMove(
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

    const action = dformStyleMove(
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

    const action = dformStyleMove(
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

    const action = dformStyleMove(
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

    const action = dformStyleMove(
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

    const action = dformStyleMove(
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
