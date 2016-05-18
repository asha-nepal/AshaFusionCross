import React from 'react'

import {
  Provider,
} from 'react-redux'

import configureStore from '../../store/configureStore'

const store = configureStore()

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
