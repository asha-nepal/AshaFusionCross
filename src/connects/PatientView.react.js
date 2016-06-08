import { connect } from 'react-redux'
import {
  fetchPatient,
  putPatient,
} from '../actions'

const mapStateToProps = (state) => ({
  patient: state.activePatient,
  records: state.activeRecords,
})

const mapDispatchToProps = (dispatch) => ({
  fetchPatient: (patientId) => dispatch(fetchPatient(patientId)),
  putPatient: (patient) => dispatch(putPatient(patient)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
