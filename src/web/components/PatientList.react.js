/* @flow */

import React, { PropTypes} from 'react'
import { Link } from 'react-router'

export default React.createClass({
  propTypes: {
    isFetching: PropTypes.bool,
    fetchPatientList: PropTypes.func.isRequired,
    subscribeChange: PropTypes.func.isRequired,
    patientList: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })).isRequired,
    onPatientSelect: PropTypes.func,
  },

  componentWillMount() {
    this.props.fetchPatientList()

    this.setState({
      unsubscribeChange: this.props.subscribeChange()
    })
  },

  componentWillUnmount() {
    if (this.state.unsubscribeChange) {
      this.state.unsubscribeChange()
    }
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
        <Link to={'/patient/'}>
          New
        </Link>
        <ul>
        {patientList.map((patient, i) =>
          <li key={i}>
            <Link to={`/patient/${patient._id}`}>
              {patient.name}
            </Link>
          </li>
        )}
        </ul>
      </div>
    )
  }
})
