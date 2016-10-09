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
      <Auth>
        <Router>
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
        </Router>
      </Auth>
      <Alerts />
    </View>
  </Root>
);
