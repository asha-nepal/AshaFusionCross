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
import AdminRoute from '../containers/AdminRoute';

// Electron or Web?
const Router = (window && window.process && window.process.type) ? HashRouter : BrowserRouter;

const App = ({ children }: { children: ReactClass }) => (
  <div>
    <Alerts />
    {children}
  </div>
);

export default connect(() => (
  <App>
    <Auth>
      <Router>
        <div>
          <Route exact path="/" component={PatientSelect} />
          <Route path="/patient/:patientId?" component={PatientView} />
          <AdminRoute path="/admin" component={Admin} />
          <Route path="/stats" component={Stats} />
        </div>
      </Router>
    </Auth>
  </App>
));
