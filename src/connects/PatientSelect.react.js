import { connect } from 'react-redux';
import {
  fetchPouchDocs,
  requestLogout,
} from '../actions';
import {
  getSortedFilteredPatientList,
} from '../selectors';

const mapStateToProps = (state) => ({
  isFetching: state.status.isFetchingPatientList,
  patientList: getSortedFilteredPatientList(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPatientList: () =>
    dispatch(fetchPouchDocs(
      'patients',
      { prefix: 'patient_', label: 'patient list' }
    )),
  logout: () => dispatch(requestLogout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
