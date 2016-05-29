import { connect } from 'react-redux'
import {
  fetchPatient,
} from '../actions'

const mapStateToProps = (state) => ({
  patient: state.activePatient,
})

const mapDispatchToProps = (dispatch) => ({
  fetchPatient: (patientId) => dispatch(fetchPatient(patientId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
