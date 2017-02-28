/* @flow */
import tableRules from './_initial/tableRules.json';
import tableColumns from './_initial/tableColumns.json';
import statsRules from './_initial/statsRules.json';
import {
  STATS_DATE_SET,
} from 'actions';

const initialState = {
  tableRules,
  tableColumns,
  statsRules,
  date: {
    startDate: null,
    endDate: null,
  },
};

export default function (state: Object = initialState, action: StatsAction): Object {
  switch (action.type) {
    case STATS_DATE_SET: {
      return {
        ...state,
        date: action.payload.date,
      };
    }

    default:
      return initialState;
  }
}
