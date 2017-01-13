import React from 'react';

import {
  Router,
  Route,
  IndexRoute,
} from 'react-router';
import history from '../history';

import connect from '../../common/connect';
import Auth from '../containers/Auth';
import Alerts from '../containers/Alerts.react';
import PatientSelect from '../containers/PatientSelect';
import PatientView from '../containers/PatientView.react';
import Admin from '../containers/Admin';

import {
  getIsAdmin,
} from '../../selectors';

const App = ({ children }: { children: ReactClass }) => (
  <div>
    <Alerts />
    {children}
  </div>
);

export default connect(({
  getState,
}) => {
  function requireAdmin(nextState, replace) {
    const state = getState();

    if (!getIsAdmin(state)) {
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  }

  return (
    <App>
      <Auth>
        <Router history={history}>
          <Route path="/">
            <IndexRoute component={PatientSelect} />
            <Route path="patient/" component={PatientView} />
            <Route path="patient/:patientId" component={PatientView} />
            <Route path="admin" component={Admin} onEnter={requireAdmin} />
          </Route>
        </Router>
      </Auth>
    </App>
  );
});
