import React from 'react'

export default React.createClass({
  render() {
    const {
      patientList,
    } = this.props

    return (
      <ul>
      {patientList.map((patient, i) =>
        <li key={i}>{patient.name}</li>
      )}
      </ul>
    )
  }
})
