/* @flow */

import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';

const mapStateToProps = (state, ownProps) => ({
  value: _get(state, ownProps.model),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (newValue) => dispatch(actions.change(ownProps.model, newValue)),
});

export default connect(
  mapStateToProps, mapDispatchToProps
);
