import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  componentWillMount() {
    this.props.fetchPatientList()
  },

  render() {
    const {
      isFetching,
      patientList,
      onPatientSelect,
    } = this.props

    if (isFetching) {
      return <div>Fetching patient list...</div>
    }

    return (
      <div>
        <Link to={'/patient/create'}>
          New
        </Link>
        <ul>
        {patientList.map((patient, i) =>
          <li key={i}>
            <Link to={`/patient/view/${patient._id}`}>
              {patient.name}
            </Link>
          </li>
        )}
        </ul>
      </div>
    )
  }
})
