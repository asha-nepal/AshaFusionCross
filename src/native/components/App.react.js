import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';

import Root from '../../common/Root.react';

import Alerts from '../containers/Alerts.react';
import PatientList from '../containers/PatientList.react';
import PatientView from '../containers/PatientView.react';
import Settings from '../containers/Settings.react';

import {
  View,
} from 'react-native';

export default () => (
  <Root>
    <View style={{ flex: 1 }}>
      <Router>
        <Scene key="root">
          <Scene
            initial
            key="patientList"
            title="Patient List"
            component={PatientList}
            rightTitle="Settings"
            onRight={() => Actions.settings()}
          />
          <Scene key="patientView" component={PatientView} title="Patient Records" />
          <Scene key="settings" component={Settings} title="Settings" />
        </Scene>
      </Router>

      <Alerts />
    </View>
  </Root>
);
