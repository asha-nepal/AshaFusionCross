/* eslint-env jest */

jest.unmock('reselect');
jest.unmock('deep-freeze');
jest.unmock('../index');

import deepFreeze from 'deep-freeze';
import {
  patientListSelector,
  filterSelector,
  filterPatientList,
  recordFormStyleIdSelector,
} from '../index';

describe('patientListSelector', () => {
  it('selects patientList from state', () => {
    const state = {
      patientList: [
        { _id: 'patient_hoge', name: 'Hoge' },
        { _id: 'patient_fuga', name: 'Fuga' },
      ],
    };

    deepFreeze(state);

    expect(patientListSelector(state))
      .toEqual([
        { _id: 'patient_hoge', name: 'Hoge' },
        { _id: 'patient_fuga', name: 'Fuga' },
      ]);
  });
});

describe('filterSelector', () => {
  it('selects filter from state with trimming', () => {
    const state = {
      patientSelect: {
        filter: ' foo bar ',
      },
    };

    deepFreeze(state);

    expect(filterSelector(state))
      .toEqual('foo bar');
  });

  it('selects filter from state with converting to lower characters', () => {
    const state = {
      patientSelect: {
        filter: 'Foo Bar',
      },
    };

    deepFreeze(state);

    expect(filterSelector(state))
      .toEqual('foo bar');
  });
});

describe('filterPatientList', () => {
  it('filters patientList', () => {
    const state = {
      patientList: [
        { _id: 'patient_hoge', name: 'hoge' },
        { _id: 'patient_hogefoo', name: 'hoge foo' },
        { _id: 'patient_fuga', name: 'Fuga' },
        { _id: 'patient_hogehoge', name: 'HogeHoge' },
      ],
      patientSelect: {
        filter: ' hoge ',
      },
    };

    deepFreeze(state);

    expect(filterPatientList(state))
      .toEqual([
        { _id: 'patient_hoge', name: 'hoge' },
        { _id: 'patient_hogefoo', name: 'hoge foo' },
        { _id: 'patient_hogehoge', name: 'HogeHoge' },
      ]);
  });
});


describe('recordFormStyleIdSelector', () => {
  it('selects recordFormStyleId', () => {
    const state = {
      patientView: {
        recordFormStyleId: 'dummystyleid',
      },
    };

    deepFreeze(state);

    expect(recordFormStyleIdSelector(state))
      .toEqual('dummystyleid');
  });
});
