/* @flow */

import React, { PropTypes} from 'react'
import { Link } from 'react-router'

export default React.createClass({
  propTypes: {
    isFetching: PropTypes.bool,
    patientList: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })).isRequired,
    onPatientSelect: PropTypes.func,
  },

  componentWillMount() {
    this.props.fetchPatientList()

    const change = this.props.subscribeChange()
    this.setState({change: change})
  },

  componentWillUnmount() {
    if (this.state.change) {
      this.state.change.cancel()
      this.setState({change: null})
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
