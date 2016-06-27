import React from 'react'
import { Router, Scene, Actions } from 'react-native-router-flux'

import Root from '../../common/Root.react'

import PatientList from '../containers/PatientList.react'
import PatientView from '../containers/PatientView.react'
import Settings from '../containers/Settings.react'

export default React.createClass({
  render() {
    return (
      <Root>
        <Router>
          <Scene key="root">
            <Scene key="patientList" component={PatientList} title="Patient List" initial={true}
              rightTitle='Settings' onRight={() => Actions.settings()}
            />
            <Scene key="patientView" component={PatientView} title="Patient Records" />
            <Scene key="settings" component={Settings} title="Settings" />
          </Scene>
        </Router>
      </Root>
    )
  }
})
