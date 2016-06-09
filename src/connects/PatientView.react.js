import { connect } from 'react-redux'
import {
  fetchPatient,
  putPatient,
  putRecord,
  updateActivePatient,
} from '../actions'

import { db } from '../db'

const mapStateToProps = (state) => ({
  patient: state.activePatient,
  records: state.activeRecords,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPatient: (patientId) => dispatch(fetchPatient(patientId)),
  putPatient: (patient) => dispatch(putPatient(patient)),
  putRecord: (record) => dispatch(putRecord(record)),
  subscribeChange: () => {
    const patientId = ownProps.params.patientId

    return db.changes({
        since: 'now',
        live: true,
        include_docs: true,
      })
      .on('change', change => {
        if (change.doc._id === patientId) {
          dispatch(updateActivePatient(change.doc))
        }
      })
      .on('error', error => {
        console.log('change error', error)
      })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
