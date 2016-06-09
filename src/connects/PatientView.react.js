import { connect } from 'react-redux'
import {
  fetchPatient,
  putPatient,
  putRecord,
} from '../actions'

const mapStateToProps = (state) => ({
  isFetching: state.status.isFetchingPatient,
  patient: state.activePatient,
  records: state.activeRecords,
  isPuttingPatient: state.status.isPuttingPatient,
  isPuttingRecord: state.status.isPuttingRecord,
})

const mapDispatchToProps = (dispatch) => ({
  fetchPatient: (patientId) => dispatch(fetchPatient(patientId)),
  putPatient: (patient) => dispatch(putPatient(patient)),
  putRecord: (record) => dispatch(putRecord(record)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
