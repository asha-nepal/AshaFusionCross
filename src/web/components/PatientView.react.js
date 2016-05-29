import React from 'react'

import {
  Link,
} from 'react-router'

export default React.createClass({
  componentWillMount() {
    this.props.fetchPatient(this.props.params.patientId)
  },

  render() {
    const {
      patient,
    } = this.props

    return (
      <div>
        <h2>{ patient.name }</h2>
        <Link to='/'>Top</Link>
      </div>
    )
  }
})
