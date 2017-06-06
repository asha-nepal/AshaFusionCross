/* eslint-env jest */

jest.unmock('reselect');
jest.unmock('deep-freeze');
jest.unmock('../index');
jest.unmock('moment');

import deepFreeze from 'deep-freeze';
import moment from 'moment';
import {
  getPatientList,
  getPatientSelectFilter,
  getPatientSelectQueryList,
  checkPatientMatchesQueries,
  getFilteredPatientList,
  getSortedFilteredPatientList,
  makeGetDuplicatedPatients,
} from '../index';
const currentTime = moment(Date.now());
describe('getPatientList', () => {
  it('selects patientList from state', () => {
    const state = {
      patientList: [
        { _id: 'patient_hoge', name: 'Hoge' },
        { _id: 'patient_fuga', name: 'Fuga' },
      ],
    };

    deepFreeze(state);

    expect(getPatientList(state))
      .toEqual([
        { _id: 'patient_hoge', name: 'Hoge' },
        { _id: 'patient_fuga', name: 'Fuga' },
      ]);
  });
});

describe('getPatientSelectFilter', () => {
  it('selects filter from state with trimming', () => {
    const state = {
      patientSelect: {
        filter: ' foo bar ',
      },
    };

    deepFreeze(state);

    expect(getPatientSelectFilter(state))
      .toEqual('foo bar');
  });

  it('selects filter from state with converting to lower characters', () => {
    const state = {
      patientSelect: {
        filter: 'Foo Bar',
      },
    };

    deepFreeze(state);

    expect(getPatientSelectFilter(state))
      .toEqual('foo bar');
  });
});

describe('getPatientSelectQueryList', () => {
  it('selects filter from state and split to list', () => {
    const state = {
      patientSelect: {
        filter: 'foo bar',
      },
    };

    deepFreeze(state);

    expect(getPatientSelectQueryList(state))
      .toEqual(['foo', 'bar']);
  });

  it('returns empty array if no filter provided', () => {
    const state = {
      patientSelect: {
        filter: '',
      },
    };

    deepFreeze(state);

    expect(getPatientSelectQueryList(state))
      .toEqual([]);
  });
});

describe('checkPatientMatchesQueries', () => {
  it('matches only at the beginning of term', () => {
    expect(checkPatientMatchesQueries(['ho'], { name: 'hoge fuga' })).toBe(true);
    expect(checkPatientMatchesQueries(['ge'], { name: 'hoge fuga' })).toBe(false);
    expect(checkPatientMatchesQueries(['fu'], { name: 'hoge fuga' })).toBe(true);
    expect(checkPatientMatchesQueries(['ga'], { name: 'hoge fuga' })).toBe(false);
  });

  it('matches multiple queries', () => {
    expect(checkPatientMatchesQueries(['ho', 'fu'], { name: 'hoge fuga' })).toBe(true);
    expect(checkPatientMatchesQueries(['ho', 'fu'], { name: 'hoge aaaa' })).toBe(false);
  });

  it('matches patient.number', () => {
    expect(checkPatientMatchesQueries(['123'], { number: '123' })).toBe(true);
    expect(checkPatientMatchesQueries(['123'], { number: '987' })).toBe(false);
  });

  it('queries name and number', () => {
    expect(checkPatientMatchesQueries(['hoge', '123'], { name: 'hoge', number: '123' }))
      .toBe(true);
    expect(checkPatientMatchesQueries(['hoge', '123'], { name: 'hoge', number: '987' }))
      .toBe(false);
  });
});

describe('getFilteredPatientList', () => {
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

    expect(getFilteredPatientList(state))
      .toEqual([
        { _id: 'patient_hoge', name: 'hoge' },
        { _id: 'patient_hogefoo', name: 'hoge foo' },
        { _id: 'patient_hogehoge', name: 'HogeHoge' },
      ]);
  });
});

describe('getSortedFilteredPatientList', () => {
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
        sortBy: 'name',
        sortInAsc: true,
        filterDate: { startDate: null, endDate: null },
      },
    };

    deepFreeze(state);

    expect(getSortedFilteredPatientList(state))
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
        { name: 'hoge fuga', $updated_at: currentTime },
        { name: 'Hoge foo', $updated_at: currentTime },
        { name: '', $updated_at: currentTime },
      ],
      patientSelect: {
        filter: '',
        sortBy: 'name',
        sortInAsc: true,
        filterDate: { startDate: null, endDate: null },
      },
    };

    deepFreeze(state);

    expect(getSortedFilteredPatientList(state))
      .toEqual([
        { name: 'Hoge foo', $updated_at: currentTime },
        { name: 'hoge fuga', $updated_at: currentTime },
        { name: '', $updated_at: currentTime },  // 空データは末尾に来る
      ]);
  });

  it('sorts according in ASC if sortInAsc is true', () => {
    const state = {
      patientList: [
        { name: 'aaa', $updated_at: currentTime },
        { name: 'zzz', $updated_at: currentTime },
      ],
      patientSelect: {
        filter: '',
        sortBy: 'name',
        sortInAsc: true,
        filterDate: { startDate: null, endDate: null },
      },
    };

    deepFreeze(state);

    expect(getSortedFilteredPatientList(state))
      .toEqual([
        { name: 'aaa', $updated_at: currentTime },
        { name: 'zzz', $updated_at: currentTime },
      ]);
  });

  it('sorts according in DESC if sortInAsc is false', () => {
    const state = {
      patientList: [
        { name: 'aaa', $updated_at: currentTime },
        { name: 'zzz', $updated_at: currentTime },
      ],
      patientSelect: {
        filter: '',
        sortBy: 'name',
        sortInAsc: false,
        filterDate: { startDate: null, endDate: null },
      },
    };

    deepFreeze(state);

    expect(getSortedFilteredPatientList(state))
      .toEqual([
        { name: 'zzz', $updated_at: currentTime },
        { name: 'aaa', $updated_at: currentTime },
      ]);
  });

  it('sorts by specified field', () => {
    const state = {
      patientList: [
        { hoge: 'ccc', $updated_at: currentTime },
        { hoge: 'aaa', $updated_at: currentTime },
        { hoge: 'bbb', $updated_at: currentTime },
      ],
      patientSelect: {
        filter: '',
        sortBy: 'hoge',
        sortInAsc: true,
        filterDate: { startDate: null, endDate: null },
      },
    };

    deepFreeze(state);

    expect(getSortedFilteredPatientList(state))
      .toEqual([
        { hoge: 'aaa', $updated_at: currentTime },
        { hoge: 'bbb', $updated_at: currentTime },
        { hoge: 'ccc', $updated_at: currentTime },
      ]);
  });

  it('places entities whose values are null regardless of sortBy and sortInAsc', () => {
    const state = {
      patientList: [
        { hoge: null, $updated_at: currentTime },
        { hoge: 'aaa', $updated_at: currentTime },
        { hoge: 'zzz', $updated_at: currentTime },
        { hoge: null, $updated_at: currentTime },
      ],
      patientSelect: {
        filter: '',
        sortBy: 'hoge',
        sortInAsc: true,
        filterDate: { startDate: null, endDate: null },
      },
    };

    expect(getSortedFilteredPatientList(state))
      .toEqual([
        { hoge: 'aaa', $updated_at: currentTime },
        { hoge: 'zzz', $updated_at: currentTime },
        { hoge: null, $updated_at: currentTime },
        { hoge: null, $updated_at: currentTime },
      ]);

    state.patientSelect.sortInAsc = false;

    expect(getSortedFilteredPatientList(state))
      .toEqual([
        { hoge: 'zzz', $updated_at: currentTime },
        { hoge: 'aaa', $updated_at: currentTime },
        { hoge: null, $updated_at: currentTime },
        { hoge: null, $updated_at: currentTime },
      ]);
  });
});

describe('makeGetDuplicatedPatients', () => {
  it('makes a selector to find duplicated patients about specified field', () => {
    const state = {
      patientList: [
        { _id: 1, name: 'foo', number: 1 },
        { _id: 2, name: 'bar', number: 2 },
      ],
      activePatient: {
        name: 'foo', number: 2,
      },
    };

    const selectorOnName = makeGetDuplicatedPatients('name');
    expect(selectorOnName(state))
      .toEqual([
        { _id: 1, name: 'foo', number: 1 },
      ]);

    const selectorOnNumber = makeGetDuplicatedPatients('number');
    expect(selectorOnNumber(state))
      .toEqual([
        { _id: 2, name: 'bar', number: 2 },
      ]);
  });
});
