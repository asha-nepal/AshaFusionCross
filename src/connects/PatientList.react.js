import { connect } from 'react-redux'
import {
  fetchPatientList,
} from '../actions'

const mapStateToProps = (state) => {
  return {
    isFetching: state.status.isFetchingPatientList,
    patientList: state.patientList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPatientList: () => dispatch(fetchPatientList())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
