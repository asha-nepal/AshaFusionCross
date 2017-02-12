/* @flow */
import tableRules from './_initial/tableRules.json';
import tableColumns from './_initial/tableColumns.json';
import statsRules from './_initial/statsRules.json';

const initialState = {
  tableRules,
  tableColumns,
  statsRules,
};

export default function (state: Object = initialState, action: PayloadAction<{}>): Object {
  switch (action.type) {
    default:
      return initialState;
  }
}
