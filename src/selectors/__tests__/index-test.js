/* eslint-env jest */

jest.unmock('reselect');
jest.unmock('deep-freeze');
jest.unmock('../index');

import deepFreeze from 'deep-freeze';
import {
  patientListSelector,
  filterSelector,
  queryListSelector,
  filterPatient,
  filterPatientList,
  sortFilterPatientList,
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

describe('queryListSelector', () => {
  it('selects filter from state and split to list', () => {
    const state = {
      patientSelect: {
        filter: 'foo bar',
      },
    };

    deepFreeze(state);

    expect(queryListSelector(state))
      .toEqual(['foo', 'bar']);
  });

  it('returns empty array if no filter provided', () => {
    const state = {
      patientSelect: {
        filter: '',
      },
    };

    deepFreeze(state);

    expect(queryListSelector(state))
      .toEqual([]);
  });
});

describe('filterPatient', () => {
  it('matches only at the beginning of term', () => {
    expect(filterPatient(['ho'], { name: 'hoge fuga' })).toBe(true);
    expect(filterPatient(['ge'], { name: 'hoge fuga' })).toBe(false);
    expect(filterPatient(['fu'], { name: 'hoge fuga' })).toBe(true);
    expect(filterPatient(['ga'], { name: 'hoge fuga' })).toBe(false);
  });

  it('matches multiple queries', () => {
    expect(filterPatient(['ho', 'fu'], { name: 'hoge fuga' })).toBe(true);
    expect(filterPatient(['ho', 'fu'], { name: 'hoge aaaa' })).toBe(false);
  });

  it('matches patient.number', () => {
    expect(filterPatient(['123'], { number: '123' })).toBe(true);
    expect(filterPatient(['123'], { number: '987' })).toBe(false);
  });

  it('queries name and number', () => {
    expect(filterPatient(['hoge', '123'], { name: 'hoge', number: '123' })).toBe(true);
    expect(filterPatient(['hoge', '123'], { name: 'hoge', number: '987' })).toBe(false);
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

describe('sortFilterPatientList', () => {
  it('sorts filtered patient list', () => {
    const state = {
      patientList: [
        { name: 'fuga' },
        { name: 'yo hoge' },
        { name: 'ho hoge' },
        { name: 'hoge fuga' },
        { name: 'Hoge foo' },
        { name: 'fuga fuga' },
        { name: 'hoge bar' },
        { name: 'Hoge' },
      ],
      patientSelect: {
        filter: ' hoge ',
        sortInAsc: true,
      },
    };

    deepFreeze(state);

    expect(sortFilterPatientList(state))
      .toEqual([
        { name: 'ho hoge' },
        { name: 'Hoge' },
        { name: 'hoge bar' },
        { name: 'Hoge foo' },
        { name: 'hoge fuga' },
        { name: 'yo hoge' },
      ]);
  });

  it('handles empty name', () => {
    const state = {
      patientList: [
        { name: 'hoge fuga' },
        { name: 'Hoge foo' },
        { name: '' },
      ],
      patientSelect: {
        filter: '',
        sortInAsc: true,
      },
    };

    deepFreeze(state);

    expect(sortFilterPatientList(state))
      .toEqual([
        { name: '' },
        { name: 'Hoge foo' },
        { name: 'hoge fuga' },
      ]);
  });

  it('sorts according in ASC if sortInAsc is true', () => {
    const state = {
      patientList: [
        { name: 'aaa' },
        { name: 'zzz' },
      ],
      patientSelect: {
        filter: '',
        sortInAsc: true,
      },
    };

    deepFreeze(state);

    expect(sortFilterPatientList(state))
      .toEqual([
        { name: 'aaa' },
        { name: 'zzz' },
      ]);
  });

  it('sorts according in DESC if sortInAsc is false', () => {
    const state = {
      patientList: [
        { name: 'aaa' },
        { name: 'zzz' },
      ],
      patientSelect: {
        filter: '',
        sortInAsc: false,
      },
    };

    deepFreeze(state);

    expect(sortFilterPatientList(state))
      .toEqual([
        { name: 'zzz' },
        { name: 'aaa' },
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
