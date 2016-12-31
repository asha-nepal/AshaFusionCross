import React from 'react';

import {
  Router,
  Route,
  IndexRoute,
} from 'react-router';
import history from '../history';

import Root from '../../common/Root.react';
import Auth from '../containers/Auth';
import Alerts from '../containers/Alerts.react';
import PatientSelect from '../containers/PatientSelect';
import PatientView from '../containers/PatientView.react';
import Admin from '../containers/Admin';

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
          <Router history={history}>
            <Route path="/">
              <IndexRoute component={PatientSelect} />
              <Route path="patient/" component={PatientView} />
              <Route path="patient/:patientId" component={PatientView} />
              <Route path="admin" component={Admin} />
            </Route>
          </Router>
        </Auth>
      </App>
    </Root>
  );
}
