import { actions, getField } from 'react-redux-form';
import _get from 'lodash.get';

export const mapStateToProps = (state, ownProps) => {
  const model = `${ownProps.modelReducer}.${ownProps.model}`;
  const fieldState = _get(state, ownProps.fieldReducer);
  const errorsObject = fieldState ? getField(fieldState, ownProps.model).errors : null;
  const errors = Object.keys(errorsObject).filter(error => errorsObject[error]);

  return {
    value: _get(state, model),
    errors,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  const model = `${ownProps.modelReducer}.${ownProps.model}`;
  return {
    onChange: (newValue) => dispatch(actions.change(model, newValue)),
    onBlur: () => ownProps.validators && dispatch(actions.validate(model, ownProps.validators)),
  };
};
