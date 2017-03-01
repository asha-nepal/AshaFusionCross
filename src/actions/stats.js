/* @flow */
import type { Moment } from 'moment';

export const STATS_DATE_SET = 'STATS_START_DATE_SET';
export const setStatsDate = (date: Moment): SetStatsDateAction => ({
  type: STATS_DATE_SET,
  payload: {
    date,
  },
});
