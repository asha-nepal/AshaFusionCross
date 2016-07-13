/* eslint-env jest */

jest.unmock('../../../actions');
jest.unmock('../alerts');

import deepFreeze from 'deep-freeze';

import {
  addAlert,
  removeAlert,
} from '../../../actions';
import reducer from '../alerts';

describe('ADD_ALERT', () => {
  it('adds new alert', () => {
    const alertsBefore = [
      { id: 'foo', message: 'Fooooo', type: 'info' },
    ];
    const action = addAlert('bar', 'Barrrr', 'error');

    const alertsAfter = [
      { id: 'foo', message: 'Fooooo', type: 'info' },
      { id: 'bar', message: 'Barrrr', type: 'error' },
    ];

    deepFreeze(alertsBefore);
    deepFreeze(action);

    expect(reducer(alertsBefore, action))
      .toEqual(alertsAfter);
  });
});

describe('REMOVE_ALERT', () => {
  it('removes one alert specified by ID', () => {
    const alertsBefore = [
      { id: 'foo', message: 'Fooooo', type: 'info' },
      { id: 'bar', message: 'Barrrr', type: 'error' },
    ];

    const action = removeAlert('foo');

    const alertsAfter = [
      { id: 'bar', message: 'Barrrr', type: 'error' },
    ];

    deepFreeze(alertsBefore);
    deepFreeze(action);

    expect(reducer(alertsBefore, action))
      .toEqual(alertsAfter);
  });
});
