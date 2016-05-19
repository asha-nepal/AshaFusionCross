import React from 'react'

import {
  Provider,
} from 'react-redux'

import rootSaga from '../../sagas'

import configureStore from '../../store/configureStore'

const store = configureStore()
store.runSaga(rootSaga)

import PatientList from '../containers/PatientList.react'

export default React.createClass({
  render() {
    return (
      <Provider store={store}>
        <PatientList />
      </Provider>
    )
  }
})
