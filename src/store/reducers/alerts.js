/* @flow */

import {
  ADD_ALERT,
  REMOVE_ALERT,
} from '../../actions';

export default function (
  alerts: Array<Alert> = [],
  action: AlertAction,
): Array<Alert> {
  switch (action.type) {
    case ADD_ALERT:
      return [
        ...alerts,
        action.payload,
      ];

    case REMOVE_ALERT:
      return alerts.filter(a => a.id !== action.payload.id);

    default:
      return alerts;
  }
}
