import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    patientList: state.patientList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPatientList: () => dispatch({type: 'FETCH_PATIENT_LIST'})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
