/* eslint-env jest, jasmine */

jest.unmock('redux-saga/effects');
jest.unmock('mockdate');
jest.unmock('../put-active-patient');
jest.unmock('../../actions');

import MockDate from 'mockdate';
import { put, call } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import { db } from '../../db';
import {
  requestPutPatient,
  successPutPatient,
  failurePutPatient,
  setActivePatient,
  alertInfo,
  alertError,
} from '../../actions';
import {
  putActivePatient,
} from '../put-active-patient';

describe('putActivePatient', () => {
  const mockCurrentTime = 9876543210987;

  beforeEach(() => {
    MockDate.set(mockCurrentTime);
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('calls db.put(patient) with specified id and updates activePatient with new rev', () => {
    const mockPatient = {
      _id: 'patient_1234',
      _rev: '2-9AF304BE281790604D1D8A4B0F4C9ADB',
      hoge: 'fuga',
    };
    const mockAuth = {
      loggedInUser: 'dummyuser',
    };
    const mockResponse = {
      ok: true,
      id: 'patient_1234',
      rev: '3-9AF304BE281790604D1D8A4B0F4C9ADB',
    };

    const saga = putActivePatient();

    expect(saga.next().value)
      .toEqual(put(requestPutPatient()));

    saga.next();
    saga.next(mockPatient);

    expect(saga.next(mockAuth).value)
      .toEqual(call([db, db.put], {
        ...mockPatient,
        $created_at: mockCurrentTime,
        $updated_at: mockCurrentTime,
        $created_by: 'dummyuser',
        $updated_by: 'dummyuser',
      }));

    expect(saga.next(mockResponse).value)
      .toEqual(put(setActivePatient({
        _id: 'patient_1234',
        _rev: '3-9AF304BE281790604D1D8A4B0F4C9ADB',
        hoge: 'fuga',
      })));

    expect(saga.next().value)
      .toEqual(put(alertInfo('Patient data updated')));

    expect(saga.next().value)
      .toEqual(call([browserHistory, browserHistory.replace], '/patient/patient_1234'));

    expect(saga.next().value)
      .toEqual(put(successPutPatient()));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });

  it('handles error', () => {
    const mockError = {};
    const mockPatient = {
      _id: 'patient_1234',
      _rev: '2-9AF304BE281790604D1D8A4B0F4C9ADB',
      hoge: 'fuga',
    };
    const mockAuth = {};

    const saga = putActivePatient();

    expect(saga.next().value)
      .toEqual(put(requestPutPatient()));

    saga.next();
    saga.next(mockPatient);

    expect(saga.next(mockAuth).value)
      .toEqual(call([db, db.put], {
        ...mockPatient,
        $created_at: mockCurrentTime,
        $updated_at: mockCurrentTime,
        $created_by: null,
        $updated_by: null,
      }));

    expect(saga.throw(mockError).value)
      .toEqual(put(alertError('Failed updating patient data')));

    expect(saga.next().value)
      .toEqual(put(failurePutPatient(mockError)));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });

  it('handles not ok response as error', () => {
    const mockPatient = {
      _id: 'patient_1234',
      _rev: '2-9AF304BE281790604D1D8A4B0F4C9ADB',
      hoge: 'fuga',
    };
    const mockAuth = {};
    const mockResponse = {
      ok: false,
    };

    const saga = putActivePatient();

    expect(saga.next().value)
      .toEqual(put(requestPutPatient()));

    saga.next();
    saga.next(mockPatient);

    expect(saga.next(mockAuth).value)
      .toEqual(call([db, db.put], {
        ...mockPatient,
        $created_at: mockCurrentTime,
        $updated_at: mockCurrentTime,
        $created_by: null,
        $updated_by: null,
      }));

    expect(saga.next(mockResponse).value)
      .toEqual(put(alertError('Failed updating patient data')));

    expect(saga.next().value)
      .toEqual(put(failurePutPatient(new Error('Invalid response'))));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });

  it('handles response with different id as error', () => {
    const mockPatient = {
      _id: 'patient_1234',
      _rev: '2-9AF304BE281790604D1D8A4B0F4C9ADB',
      hoge: 'fuga',
    };
    const mockAuth = {};
    const mockResponse = {
      ok: true,
      id: 'patient_9876',
    };

    const saga = putActivePatient();

    expect(saga.next().value)
      .toEqual(put(requestPutPatient()));

    saga.next();
    saga.next(mockPatient);

    expect(saga.next(mockAuth).value)
      .toEqual(call([db, db.put], {
        ...mockPatient,
        $created_at: mockCurrentTime,
        $updated_at: mockCurrentTime,
        $created_by: null,
        $updated_by: null,
      }));

    expect(saga.next(mockResponse).value)
      .toEqual(put(alertError('Failed updating patient data')));

    expect(saga.next().value)
      .toEqual(put(failurePutPatient(new Error('Invalid response'))));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });

  it('does not update created_at but does updated_at', () => {
    const mockPatient = {
      _id: 'patient_1234',
      _rev: '2-9AF304BE281790604D1D8A4B0F4C9ADB',
      hoge: 'fuga',
      $created_at: 1000,
      $updated_at: 2000,
    };
    const mockAuth = {};

    const saga = putActivePatient();

    expect(saga.next().value)
      .toEqual(put(requestPutPatient()));

    saga.next();
    saga.next(mockPatient);

    expect(saga.next(mockAuth).value)
      .toEqual(call([db, db.put], {
        ...mockPatient,
        $created_at: 1000,
        $updated_at: mockCurrentTime,
        $created_by: null,
        $updated_by: null,
      }));
  });
});
