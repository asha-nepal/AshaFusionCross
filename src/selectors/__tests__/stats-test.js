/* eslint-env jest */

jest.unmock('reselect');
jest.unmock('moment');
jest.unmock('../stats');

import moment from 'moment';
import {
  getRecordListForStats,
} from '../stats';

describe('getRecordListForStats', () => {
  describe('record filtering by date', () => {
    const recordList = [
      { _id: 0, $updated_at: moment([2017, 1, 25, 0, 0, 0]).valueOf() },
      { _id: 1, $updated_at: moment([2017, 1, 25, 4, 0, 0]).valueOf() },
      { _id: 2, $updated_at: moment([2017, 1, 25, 23, 59, 59]).valueOf() },
      { _id: 3, $updated_at: moment([2017, 1, 26, 0, 0, 0]).valueOf() },
      { _id: 4, $updated_at: moment([2017, 1, 26, 4, 0, 0]).valueOf() },
      { _id: 5, $updated_at: moment([2017, 1, 26, 23, 59, 59]).valueOf() },
      { _id: 6, $updated_at: moment([2017, 1, 27, 0, 0, 0]).valueOf() },
      { _id: 7, $updated_at: moment([2017, 1, 27, 10, 0, 0]).valueOf() },
      { _id: 8, $updated_at: moment([2017, 1, 27, 23, 59, 59]).valueOf() },
      { _id: 9, $updated_at: moment([2017, 1, 28, 0, 0, 0]).valueOf() },
      { _id: 10, $updated_at: moment([2017, 1, 28, 4, 0, 0]).valueOf() },
      { _id: 11, $updated_at: moment([2017, 1, 28, 23, 59, 59]).valueOf() },
    ];

    [
      [
        moment([2017, 1, 26, 4, 0, 0]),
        moment([2017, 1, 27, 4, 0, 0]),
        [3, 4, 5, 6, 7, 8],
      ],
      [
        null,
        moment([2017, 1, 27, 4, 0, 0]),
        [0, 1, 2, 3, 4, 5, 6, 7, 8],
      ],
      [
        moment([2017, 1, 26, 4, 0, 0]),
        null,
        [3, 4, 5, 6, 7, 8, 9, 10, 11],
      ],
      [
        null,
        null,
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      ],
    ].forEach(([startDate, endDate, expected]) => {
      it('selects records filtered by date', () => {
        const state = {
          recordList,
          stats: {
            date: {
              startDate,
              endDate,
            },
          },
        };

        expect(getRecordListForStats(state).map(r => r._id))
          .toEqual(expected);
      });
    });
  });
});
