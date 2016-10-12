/* @flow */

import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';

const mapStateToProps = (state, ownProps) => ({
  value: _get(state, ownProps.model),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: v => dispatch(actions.change(ownProps.model, v)),
});

export default connect(mapStateToProps, mapDispatchToProps);
