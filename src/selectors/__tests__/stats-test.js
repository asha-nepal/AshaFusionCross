/* eslint-env jest */

jest.unmock('reselect');
jest.unmock('moment');
jest.unmock('../stats');
jest.unmock('../patient-list');

import moment from 'moment';
import {
  getRecordListForStats,
} from '../stats';

describe('getRecordListForStats', () => {
  it('selects records filtered by date', () => {
    const recordList = [
      { _id: 'foo', $updated_at: moment([2017, 1, 25, 10, 0, 0]).valueOf() },
      { _id: 'bar', $updated_at: moment([2017, 1, 26, 10, 0, 0]).valueOf() },
      { _id: 'baz', $updated_at: moment([2017, 1, 27, 10, 0, 0]).valueOf() },
    ];

    const state = {
      recordList,
      stats: {
        date: {
          startDate: moment([2017, 1, 26, 0, 0, 0]),
          endDate: moment([2017, 1, 27, 0, 0, 0]),
        },
      },
    };

    expect(getRecordListForStats(state))
      .toEqual([
        recordList[1],
      ]);
  });

  it('returns records without filtering if date not specified', () => {
    const recordList = [
      { _id: 'foo', $updated_at: moment([2017, 1, 25, 10, 0, 0]).valueOf() },
      { _id: 'bar', $updated_at: moment([2017, 1, 26, 10, 0, 0]).valueOf() },
      { _id: 'baz', $updated_at: moment([2017, 1, 27, 10, 0, 0]).valueOf() },
    ];

    const state = {
      recordList,
      stats: {
        date: {
          startDate: null,
          endDate: null,
        },
      },
    };

    expect(getRecordListForStats(state))
      .toEqual([recordList[0], recordList[1], recordList[2]]);
  });

  it('merges patient data', () => {
    const recordList = [
      { _id: 'record_yo_123' },
      { _id: 'record_ho_456' },
    ];

    const patientList = [
      { _id: 'patient_yo' },
      { _id: 'patient_ho' },
    ];

    const state = {
      recordList,
      patientList,
      stats: {
        date: {
          startDate: null,
          endDate: null,
        },
      },
    };

    expect(getRecordListForStats(state))
      .toEqual([
        { _id: 'record_yo_123', _patient: { _id: 'patient_yo' } },
        { _id: 'record_ho_456', _patient: { _id: 'patient_ho' } },
      ]);
  });
});
