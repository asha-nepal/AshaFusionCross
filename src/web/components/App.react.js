import React from 'react';

import {
  BrowserRouter,
  HashRouter,
  Route,
} from 'react-router-dom';

import connect from '../../common/connect';
import Auth from '../containers/Auth';
import Alerts from '../containers/Alerts.react';
import PatientSelect from '../containers/PatientSelect';
import PatientView from '../containers/PatientView.react';
import Admin from '../containers/Admin';
import Stats from '../containers/Stats';

import {
  getIsAdmin,
} from '../../selectors';

// Electron or Web?
const Router = (window && window.process && window.process.type) ? HashRouter : BrowserRouter;

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
        <Router>
          <div>
            <Route exact path="/" component={PatientSelect} />
            <Route path="/patient/:patientId?" component={PatientView} />
            <Route path="/admin" component={Admin} onEnter={requireAdmin} />
            <Route path="/stats" component={Stats} />
          </div>
        </Router>
      </Auth>
    </App>
  );
});
