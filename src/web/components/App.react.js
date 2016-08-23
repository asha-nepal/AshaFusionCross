import React from 'react';

import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} from 'react-router';

import Root from '../../common/Root.react';
import Auth from '../containers/Auth';
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
      <App>
        <Auth>
          <Router history={browserHistory}>
            <Route path="/">
              <IndexRoute component={PatientSelect} />
              <Route path="patient/" component={PatientView} />
              <Route path="patient/:patientId" component={PatientView} />
            </Route>
          </Router>
        </Auth>
      </App>
    </Root>
  );
}
