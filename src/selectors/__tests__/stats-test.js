/* eslint-env jest */

jest.unmock('reselect');
jest.unmock('moment');
jest.unmock('../stats');

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
});
