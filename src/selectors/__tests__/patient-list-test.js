/* eslint-env jest */

jest.unmock('lodash.get');
jest.unmock('../index');
jest.unmock('../patient-list');

import {
  getPatientMax,
} from '../patient-list';


describe('getPatientMax', () => {
  it('returns max of specified field of patients', () => {
    const patientList = [
      { no: 1, info: { age: 33 } },
      { no: 2, info: { age: 22 } },
      { no: 3, info: { age: 11 } },
    ];

    const state = { patientList };

    expect(getPatientMax(state, 'no'))
      .toBe(3);

    expect(getPatientMax(state, 'info.age'))
      .toBe(33);
  });

  it('can handle string as number', () => {
    const patientList = [
      { no: '1' },
      { no: '10' },
    ];
    const state = { patientList };

    expect(getPatientMax(state, 'no'))
      .toBe(10);
  });

  it('can handle string which cannot be parsed as number', () => {
    const patientList = [
      { no: 'hoge' },
      { no: 'fuga' },
    ];
    const state = { patientList };

    expect(getPatientMax(state, 'no'))
      .toBe(0);
  });
});
