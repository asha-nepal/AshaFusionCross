/* eslint-env jest, jasmine */

jest.unmock('redux-saga/effects');
jest.unmock('../../actions');
jest.unmock('../../actions/dform');
jest.unmock('../dform');

import { call, put } from 'redux-saga/effects';
import PouchDB from 'pouchdb';
import {
  setDformStyleForm,
} from '../../actions';
import {
  fetchDformStyles,
} from '../dform';

describe('fetchDformStyles', () => {
  it('calls db.allDocs with startkey and endkey', () => {
    const db = new PouchDB();
    const mockFetchedDocs = {
      total_rows: 123,
      offset: 42,
      rows: [
        {
          _id: 'dformStyle:record:some-form',
          doc: {
            _id: 'dformStyle:record:some-form',
            label: 'Some form',
            style: [
              { field: 'foo', class: 'textinput' },
            ],
          },
        },
        {
          _id: 'dformStyle:record:another-form',
          doc: {
            _id: 'dformStyle:record:another-form',
            label: 'Another form',
            style: [
              { field: 'bar', class: 'textunitinput' },
            ],
          },
        },
      ],
    };

    const saga = fetchDformStyles(db);

    expect(saga.next().value)
      .toEqual(call([db, db.allDocs], {
        startkey: 'dformStyle:record:',
        endkey: 'dformStyle:record:\uffff',
        include_docs: true,
      }));

    expect(saga.next(mockFetchedDocs).value)
      .toEqual(put(setDformStyleForm('record', 'some-form', 'Some form', [
        { field: 'foo', class: 'textinput' },
      ])));

    expect(saga.next().value)
      .toEqual(put(setDformStyleForm('record', 'another-form', 'Another form', [
        { field: 'bar', class: 'textunitinput' },
      ])));
  });
});
