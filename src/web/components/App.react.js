/**
 * Copyright 2016-2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
