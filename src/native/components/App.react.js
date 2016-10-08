import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Root from '../../common/Root.react';
import Auth from '../containers/Auth';
import Alerts from '../containers/Alerts.react';
import PatientSelect from '../containers/PatientSelect.react';
import PatientView from '../containers/PatientView.react';

import {
  View,
} from 'react-native';

export default () => (
  <Root>
    <View style={{ flex: 1 }}>
      <Auth>
        <Router>
          <Scene key="root">
            <Scene
              initial
              key="patientSelect"
              title="Patient List"
              component={PatientSelect}
            />
            <Scene key="patientView" component={PatientView} title="Patient Records" />
          </Scene>
        </Router>
      </Auth>
      <Alerts />
    </View>
  </Root>
);
