/* eslint-env jest */

jest.unmock('../../../actions');
jest.unmock('../patient-view');

import deepFreeze from 'deep-freeze';

import {
  selectActiveRecord,
  setRecordFormStyleId,
  setPatientFormVisibility,
  setRecordChartVisibility,
  setRecordChartType,
} from '../../../actions';
import reducer from '../patient-view';

describe('SELECT_ACTIVE_RECORD', () => {
  it('updates selectedActiveRecordId', () => {
    const stateBefore = {
      selectedActiveRecordId: null,
    };
    const action = selectActiveRecord('dummyrecordid');

    const stateAfter = {
      selectedActiveRecordId: 'dummyrecordid',
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});

describe('SET_RECORD_FORM_STYLE_ID', () => {
  it('updates recordFormStyleId', () => {
    const stateBefore = {
      recordFormStyleId: 'hoge',
    };
    const action = setRecordFormStyleId('fuga');

    const stateAfter = {
      recordFormStyleId: 'fuga',
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});

describe('SET_PATIENT_FORM_VISIBILITY', () => {
  it('updates patientFormVisibility', () => {
    const stateBefore = {
      patientFormVisibility: false,
    };
    const action = setPatientFormVisibility(true);

    const stateAfter = {
      patientFormVisibility: true,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});

describe('SET_RECORD_CHART_VISIBILITY', () => {
  it('updates recordChartVisibility', () => {
    const stateBefore = {
      recordChartVisibility: false,
    };
    const action = setRecordChartVisibility(true);

    const stateAfter = {
      recordChartVisibility: true,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});

describe('SET_RECORD_CHART_TYPE', () => {
  it('updates recordChartType', () => {
    const stateBefore = {
      recordChartType: 'hoge',
    };
    const action = setRecordChartType('fuga');

    const stateAfter = {
      recordChartType: 'fuga',
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});
