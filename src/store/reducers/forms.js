/* @flow */
import {
  combineForms,
} from 'react-redux-form';

export default combineForms({
  signup: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
}, 'forms');
