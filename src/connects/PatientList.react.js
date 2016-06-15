import { connect } from 'react-redux'
import {
  fetchPatientList,
} from '../actions'

import { db } from '../db'

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
      return db.changes({
          since: 'now',
          live: true,
          include_docs: true,
        })
        .on('change', change => {
          dispatch(fetchPatientList())  // TODO 全件fetchし直すのは効率が悪い
        })
        .on('error', error => {
          console.log('change error', error)
        })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
