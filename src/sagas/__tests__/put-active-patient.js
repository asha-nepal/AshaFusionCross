/* eslint-env jest, jasmine */

jest.unmock('redux-saga/effects');
jest.unmock('../put-active-patient');
jest.unmock('../../actions');

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
  it('calls db.put(patient) with specified id and updates activePatient with new rev', () => {
    const mockPatient = {
      _id: 'patient_1234',
      _rev: '2-9AF304BE281790604D1D8A4B0F4C9ADB',
      hoge: 'fuga',
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

    expect(saga.next(mockPatient).value)
      .toEqual(call([db, db.put], mockPatient));

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

    const saga = putActivePatient();

    expect(saga.next().value)
      .toEqual(put(requestPutPatient()));

    saga.next();

    expect(saga.next(mockPatient).value)
      .toEqual(call([db, db.put], mockPatient));

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
    const mockResponse = {
      ok: false,
    };

    const saga = putActivePatient();

    expect(saga.next().value)
      .toEqual(put(requestPutPatient()));

    saga.next();

    expect(saga.next(mockPatient).value)
      .toEqual(call([db, db.put], mockPatient));

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
    const mockResponse = {
      ok: true,
      id: 'patient_9876',
    };

    const saga = putActivePatient();

    expect(saga.next().value)
      .toEqual(put(requestPutPatient()));

    saga.next();

    expect(saga.next(mockPatient).value)
      .toEqual(call([db, db.put], mockPatient));

    expect(saga.next(mockResponse).value)
      .toEqual(put(alertError('Failed updating patient data')));

    expect(saga.next().value)
      .toEqual(put(failurePutPatient(new Error('Invalid response'))));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });
});
