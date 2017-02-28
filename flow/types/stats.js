/* @flow */

import PayloadAction from './action';
import moment from 'moment';

interface SetStatsDatePayload {
  date: moment.Moment,
}
interface SetStatsDateAction extends PayloadAction<SetStatsDatePayload> {}

export type StatsAction = SetStatsDateAction;
