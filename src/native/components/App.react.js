import React, {
  Component,
} from 'react'

import {
  Provider,
} from 'react-redux'

import rootSaga from '../../sagas'

import configureStore from '../../store/configureStore'

const store = configureStore()
store.runSaga(rootSaga)

import PatientList from '../containers/PatientList.react'

export default class extends Component {
  render() {
    return (
      <Provider store={store} >
        <PatientList />
      </Provider>
    )
  }
}
