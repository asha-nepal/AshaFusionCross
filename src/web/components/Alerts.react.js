/* @flow */

import React from 'react';

export default function Alerts({ alerts }: { alerts: Array<Alert> }) {
  return (
    <ul>
    {alerts.map(alert =>
      <li key={alert.id}>{alert.message}</li>
    )}
    </ul>
  );
}
