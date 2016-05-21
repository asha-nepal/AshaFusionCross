import { connect } from 'react-redux'
import {
  fetchPatientData,
} from '../actions'

const mapStateToProps = (state) => ({
  patientData: state.patientData,
})

const mapDispatchToProps = (dispatch) => ({
  fetchPatientData: (patientId) => dispatch(fetchPatientData(patientId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
