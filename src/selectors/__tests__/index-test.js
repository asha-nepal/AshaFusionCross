/* eslint-env jest */

jest.unmock('reselect');
jest.unmock('deep-freeze');
jest.unmock('../index');

import deepFreeze from 'deep-freeze';
import {
  getPatientList,
  getPatientSelectFilter,
  getPatientSelectQueryList,
  checkPatientMatchesQueries,
  getFilteredPatientList,
  getSortedFilteredPatientList,
  getRecordFormStyleId,
  makeGetDuplicatedPatients,
} from '../index';

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
        { name: 'hoge fuga' },
        { name: 'Hoge foo' },
        { name: '' },
      ],
      patientSelect: {
        filter: '',
        sortBy: 'name',
        sortInAsc: true,
      },
    };

    deepFreeze(state);

    expect(getSortedFilteredPatientList(state))
      .toEqual([
        { name: 'Hoge foo' },
        { name: 'hoge fuga' },
        { name: '' },  // 空データは末尾に来る
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
        sortBy: 'name',
        sortInAsc: true,
      },
    };

    deepFreeze(state);

    expect(getSortedFilteredPatientList(state))
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
        sortBy: 'name',
        sortInAsc: false,
      },
    };

    deepFreeze(state);

    expect(getSortedFilteredPatientList(state))
      .toEqual([
        { name: 'zzz' },
        { name: 'aaa' },
      ]);
  });

  it('sorts by speficied field', () => {
    const state = {
      patientList: [
        { hoge: 'ccc' },
        { hoge: 'aaa' },
        { hoge: 'bbb' },
      ],
      patientSelect: {
        filter: '',
        sortBy: 'hoge',
        sortInAsc: true,
      },
    };

    deepFreeze(state);

    expect(getSortedFilteredPatientList(state))
      .toEqual([
        { hoge: 'aaa' },
        { hoge: 'bbb' },
        { hoge: 'ccc' },
      ]);
  });

  it('places entities whose values are null regardless of sortBy and sortInAsc', () => {
    const state = {
      patientList: [
        { hoge: null },
        { hoge: 'aaa' },
        { hoge: 'zzz' },
        { hoge: null },
      ],
      patientSelect: {
        filter: '',
        sortBy: 'hoge',
        sortInAsc: true,
      },
    };

    expect(getSortedFilteredPatientList(state))
      .toEqual([
        { hoge: 'aaa' },
        { hoge: 'zzz' },
        { hoge: null },
        { hoge: null },
      ]);

    state.patientSelect.sortInAsc = false;

    expect(getSortedFilteredPatientList(state))
      .toEqual([
        { hoge: 'zzz' },
        { hoge: 'aaa' },
        { hoge: null },
        { hoge: null },
      ]);
  });
});

describe('getRecordFormStyleId', () => {
  it('selects recordFormStyleId', () => {
    const state = {
      patientView: {
        recordFormStyleId: 'dummystyleid',
      },
    };

    deepFreeze(state);

    expect(getRecordFormStyleId(state))
      .toEqual('dummystyleid');
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
