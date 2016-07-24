import { connect } from 'react-redux';
import {
  fetchPatientList,
} from '../actions';

import { subscribe } from '../db';

const filterPatientList = (state) => {
  const filter = state.patientSelect.filter.trim().toLowerCase();
  if (filter.length === 0) {
    return state.patientList;
  }

  return state.patientList.filter(p => p.name.toLowerCase().indexOf(filter) >= 0);
};

const mapStateToProps = (state) => ({
  isFetching: state.status.isFetchingPatientList,
  patientList: filterPatientList(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPatientList: () => dispatch(fetchPatientList()),
  subscribeChange: () => subscribe('change', (/* change */) => {
    dispatch(fetchPatientList());  // TODO 全件fetchし直すのは効率が悪い
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
