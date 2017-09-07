/**
 * Copyright 2017 Yuichiro Tsuchiya
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
  View,
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Root from '../../common/Root.react';
import Auth from '../containers/Auth';
import Alerts from '../containers/Alerts.react';
import PatientSelect from '../containers/PatientSelect.react';
import PatientView from '../containers/PatientView.react';
import Drawer from './Drawer';

const DrawerButton = (<Icon
  name="menu"
  size={24}
  color="#fff"
  onPress={() => Actions.refresh({ key: 'drawer', open: value => !value })}
/>);

const BackButton = (<Icon
  name="keyboard-arrow-left"
  size={32}
  color="#fff"
  onPress={() => Actions.pop()}
/>);

export default () => (
  <Root>
    <View style={{ flex: 1 }}>
      <Router>
        <Scene key="auth" component={Auth}>
          <Scene key="drawer" component={Drawer} open={false} >
            <Scene key="main">
              <Scene
                initial
                key="patientSelect"
                title="Patient List"
                component={PatientSelect}
                navigationBarStyle={{ backgroundColor: '#0066ff' }}
                titleStyle={{ color: '#fff' }}
                renderLeftButton={() => DrawerButton}
              />
              <Scene
                key="patientView"
                component={PatientView}
                title="Patient Records"
                navigationBarStyle={{ backgroundColor: '#0066ff' }}
                titleStyle={{ color: '#fff' }}
                renderBackButton={() => BackButton}
              />
            </Scene>
          </Scene>
        </Scene>
      </Router>
      <Alerts />
    </View>
  </Root>
);
