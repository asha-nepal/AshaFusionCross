import { connect } from 'react-redux'
import {
  fetchPatient,
  putPatient,
  putRecord,
  updateActivePatient,
  updateActiveRecord,
  initActivePatient,
} from '../actions'

import { db } from '../db'

const mapStateToProps = (state) => ({
  isFetching: state.status.isFetchingPatient,
  patient: state.activePatient,
  records: state.activeRecords,
  isPuttingPatient: state.status.isPuttingPatient,
  isPuttingRecord: state.status.isPuttingRecord,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const patientId = ownProps.patientId || ownProps.params.patientId

  return {
    init: () => {
      if (patientId) dispatch(fetchPatient(patientId))
      else           dispatch(initActivePatient())
    },
    putPatient: (patient) => dispatch(putPatient(patient)),
    putRecord: (record) => dispatch(putRecord(record)),
    subscribeChange: () => {
      if (!patientId) {
        return null
      }

      return db.changes({
          since: 'now',
          live: true,
          include_docs: true,
        })
        .on('change', change => {
          if (change.doc._id === patientId) {
            dispatch(updateActivePatient(change.doc))
          } else if (change.doc.type === 'record') {
            dispatch(updateActiveRecord(change.doc))
          }
        })
        .on('error', error => {
          console.log('change error', error)
        })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
