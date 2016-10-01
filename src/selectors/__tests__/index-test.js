/* eslint-env jest */

jest.unmock('reselect');
jest.unmock('deep-freeze');
jest.unmock('../index');

import deepFreeze from 'deep-freeze';
import {
  getPatientList,
  getPatientSelectFilter,
  getPatientSelectQueryList,
  getFilteredPatientList,
  getFilteredPatientListList,
  getSortedFilteredPatientList,
  getRecordFormStyleId,
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

describe('getFilteredPatientList', () => {
  it('matches only at the beginning of term', () => {
    expect(getFilteredPatientList(['ho'], { name: 'hoge fuga' })).toBe(true);
    expect(getFilteredPatientList(['ge'], { name: 'hoge fuga' })).toBe(false);
    expect(getFilteredPatientList(['fu'], { name: 'hoge fuga' })).toBe(true);
    expect(getFilteredPatientList(['ga'], { name: 'hoge fuga' })).toBe(false);
  });

  it('matches multiple queries', () => {
    expect(getFilteredPatientList(['ho', 'fu'], { name: 'hoge fuga' })).toBe(true);
    expect(getFilteredPatientList(['ho', 'fu'], { name: 'hoge aaaa' })).toBe(false);
  });

  it('matches patient.number', () => {
    expect(getFilteredPatientList(['123'], { number: '123' })).toBe(true);
    expect(getFilteredPatientList(['123'], { number: '987' })).toBe(false);
  });

  it('queries name and number', () => {
    expect(getFilteredPatientList(['hoge', '123'], { name: 'hoge', number: '123' })).toBe(true);
    expect(getFilteredPatientList(['hoge', '123'], { name: 'hoge', number: '987' })).toBe(false);
  });
});

describe('getFilteredPatientListList', () => {
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

    expect(getFilteredPatientListList(state))
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
        sortInAsc: true,
      },
    };

    deepFreeze(state);

    expect(getSortedFilteredPatientList(state))
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
