import React from 'react'

import Root from '../../common/Root.react'
import PatientList from '../containers/PatientList.react'

export default React.createClass({
  render() {
    return (
      <Root>
        <PatientList />
      </Root>
    )
  }
})
