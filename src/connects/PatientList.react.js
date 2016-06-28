import { connect } from 'react-redux'
import {
  fetchPatientList,
} from '../actions'

import { subscribe } from '../db'

const mapStateToProps = (state) => {
  return {
    isFetching: state.status.isFetchingPatientList,
    patientList: state.patientList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPatientList: () => dispatch(fetchPatientList()),
    subscribeChange: () => {
      return subscribe('change', change => {
        dispatch(fetchPatientList())  // TODO 全件fetchし直すのは効率が悪い
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
