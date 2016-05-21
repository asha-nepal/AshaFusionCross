import React from 'react'

import {
  Link,
} from 'react-router'

export default React.createClass({
  componentWillMount() {
    this.props.fetchPatientData(this.props.params.patientId)
  },

  render() {
    const {
      patientData,
    } = this.props

    return (
      <div>
        <h2>{ patientData.name }</h2>
        <Link to='/'>Top</Link>
      </div>
    )
  }
})
