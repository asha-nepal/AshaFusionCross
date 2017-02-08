/* @flow */

import {
  SUCCESS_FETCH_RECORD_LIST,
} from '../../actions';

export default function (
  state: Array<RecordObject> = [],
  action: {
    type: string,
    recordList: Array<RecordObject>,
  }
): Array<RecordObject> {
  switch (action.type) {
    case SUCCESS_FETCH_RECORD_LIST:
      return action.recordList;

    default:
      return state;
  }
}
