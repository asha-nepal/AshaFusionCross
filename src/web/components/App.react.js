import React from 'react';

import {
  Router,
  Route,
  IndexRoute,
//  browserHistory,
  hashHistory,
} from 'react-router';
let history;
// if (PRODUCTION)
//   history = browserHistory
// else
history = hashHistory;

import Root from '../../common/Root.react';
import Alerts from '../containers/Alerts.react';
import PatientSelect from '../containers/PatientSelect.react';
import PatientView from '../containers/PatientView.react';

const App = ({ children }: { children: ReactClass }) => (
  <div>
    <Alerts />
    {children}
  </div>
);

export default function () {
  return (
    <Root>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={PatientSelect} />
          <Route path="patient/" component={PatientView} />
          <Route path="patient/:patientId" component={PatientView} />
        </Route>
      </Router>
    </Root>
  );
}
