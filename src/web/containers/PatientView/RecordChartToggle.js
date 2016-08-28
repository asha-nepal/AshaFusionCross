/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import {
  setRecordChartVisibility,
} from '../../../actions';

const mapStateToProps = (state) => ({
  visibility: state.patientView.recordChartVisibility,
});
const mapDispatchToProps = (dispatch) => ({
  setVisibility: (visibility) => dispatch(setRecordChartVisibility(visibility)),
});

const RecordChartToggleComponent = ({
  visibility,
  setVisibility,
}: {
  visibility: boolean,
  setVisibility: (visibility: boolean) => void,
}) => (
  <button
    className={visibility ? 'button is-primary' : 'button'}
    onClick={e => {
      e.preventDefault();
      setVisibility(!visibility);
    }}
  ><i className="fa fa-line-chart" /></button>
);

export default connect(mapStateToProps, mapDispatchToProps)(RecordChartToggleComponent);
