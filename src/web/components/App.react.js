import React from 'react';

import {
  BrowserRouter,
  HashRouter,
  Route,
} from 'react-router-dom';
import Async from './Async';

import connect from '../../common/connect';
import Auth from '../containers/Auth';
import Alerts from '../containers/Alerts.react';
import PatientSelect from '../containers/PatientSelect';
import PatientView from '../containers/PatientView.react';
import Admin from '../containers/Admin';
import AdminRoute from '../containers/AdminRoute';

// Electron or Web?
const Router = (window && window.process && window.process.type) ? HashRouter : BrowserRouter;

// Lazily loaded components
const Stats = () => <Async load={import('../containers/Stats')} />;

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
