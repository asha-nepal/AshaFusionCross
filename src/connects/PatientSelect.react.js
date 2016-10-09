import { connect } from 'react-redux';
import {
  fetchPatientList,
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
  fetchPatientList: () => dispatch(fetchPatientList()),
  logout: () => dispatch(requestLogout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
