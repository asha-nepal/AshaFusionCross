import React from 'react'

import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  hashHistory,
} from 'react-router'
let history
//if (PRODUCTION)
//  history = browserHistory
//else
  history = hashHistory

import Root from '../../common/Root.react'
import PatientList from '../containers/PatientList.react'
import PatientView from '../containers/PatientView.react'

export default React.createClass({
  render() {
    return (
      <Root>
        <Router history={history}>
          <Route path='/'>
            <IndexRoute component={PatientList}/>
            <Route path='patient/' component={PatientView} />
            <Route path='patient/:patientId' component={PatientView} />
          </Route>
        </Router>
      </Root>
    )
  }
})
