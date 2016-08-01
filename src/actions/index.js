/* @flow */
import { actions as formActions } from 'react-redux-form';

// for saga
export const FETCH_PATIENT_LIST = 'FETCH_PATIENT_LIST';
export const fetchPatientList = () => ({
  type: FETCH_PATIENT_LIST,
});

export const FETCH_PATIENT = 'FETCH_PATIENT';
export const fetchPatient = (patientId: string) => ({
  type: FETCH_PATIENT,
  patientId,
});

export const PUT_ACTIVE_PATIENT = 'PUT_ACTIVE_PATIENT';
export const putActivePatient = () => ({
  type: PUT_ACTIVE_PATIENT,
});

export const PUT_ACTIVE_RECORD = 'PUT_ACTIVE_RECORD';
export const putActiveRecord = (index: number) => ({
  type: PUT_ACTIVE_RECORD,
  index,
});

export const INIT_ACTIVE_PATIENT = 'INIT_ACTIVE_PATIENT';
export const initActivePatient = () => ({
  type: INIT_ACTIVE_PATIENT,
});

export const ADD_NEW_ACTIVE_RECORD = 'ADD_NEW_ACTIVE_RECORD';
export const addNewActiveRecord = (patientId: string) => ({
  type: ADD_NEW_ACTIVE_RECORD,
  patientId,
});

export const setActivePatient = formActions.change.bind(null, 'activePatient');

export const setActiveRecords = formActions.change.bind(null, 'activeRecords');

export const resetActiveRecords = formActions.reset.bind(null, 'activeRecords');

export const pushActiveRecord = formActions.push.bind(null, 'activeRecords');

export const insertOrChangeActiveRecord = (record: RecordObject) =>
  (dispatch: Function, getState: Function) => {
    const key = '_id';
    const model = 'activeRecords';
    const collection = getState().activeRecords;
    const index = collection.findIndex(c => c[key] === record[key]);

    if (index > -1) {
      dispatch(formActions.change(`${model}[${index}]`, record));
    } else {
      // pushでの末尾追加ではない
      // IDでソートし，複数端末間で時間差submitしても順序を一意に保つ
      dispatch(formActions.change(model, collection.concat(record).sort((a, b) => a._id > b._id)));
    }
  };


export const CONNECT_POUCHDB = 'CONNECT_POUCHDB';
export const connectPouchDB = () => ({
  type: CONNECT_POUCHDB,
});


export const PUSH_ALERT = 'PUSH_ALERT';
export const pushAlert = (type: string, message: string, timeout: number) => ({
  type: PUSH_ALERT,
  payload: {
    message,
    type,
    timeout,
  },
});

export const alertError = pushAlert.bind(this, 'error');
export const alertInfo = pushAlert.bind(this, 'info');


// for reducers
export const REQUEST_FETCH_PATIENT_LIST = 'REQUEST_FETCH_PATIENT_LIST';
export const SUCCESS_FETCH_PATIENT_LIST = 'SUCCESS_FETCH_PATIENT_LIST';
export const FAILURE_FETCH_PATIENT_LIST = 'FAILURE_FETCH_PATIENT_LIST';

export const requestFetchPatientList = () => ({
  type: REQUEST_FETCH_PATIENT_LIST,
});

export const successFetchPatientList = (patientList: Array<PatientObject>) => ({
  type: SUCCESS_FETCH_PATIENT_LIST,
  patientList,
});

export const failureFetchPatientList = (error: ErrorObject) => ({
  type: FAILURE_FETCH_PATIENT_LIST,
  error,
});


export const REQUEST_FETCH_PATIENT = 'REQUEST_FETCH_PATIENT';
export const SUCCESS_FETCH_PATIENT = 'SUCCESS_FETCH_PATIENT';
export const FAILURE_FETCH_PATIENT = 'FAILURE_FETCH_PATIENT';

export const requestFetchPatient = () => ({
  type: REQUEST_FETCH_PATIENT,
});

export const successFetchPatient = () => ({
  type: SUCCESS_FETCH_PATIENT,
});

export const failureFetchPatient = (error: ErrorObject) => ({
  type: FAILURE_FETCH_PATIENT,
  error,
});


export const REQUEST_PUT_PATIENT = 'REQUEST_PUT_PATIENT';
export const SUCCESS_PUT_PATIENT = 'SUCCESS_PUT_PATIENT';
export const FAILURE_PUT_PATIENT = 'FAILURE_PUT_PATIENT';

export const requestPutPatient = () => ({
  type: REQUEST_PUT_PATIENT,
});

export const successPutPatient = () => ({
  type: SUCCESS_PUT_PATIENT,
});

export const failurePutPatient = (error: ErrorObject) => ({
  type: FAILURE_PUT_PATIENT,
  error,
});


export const REQUEST_PUT_RECORD = 'REQUEST_PUT_RECORD';
export const SUCCESS_PUT_RECORD = 'SUCCESS_PUT_RECORD';
export const FAILURE_PUT_RECORD = 'FAILURE_PUT_RECORD';

export const requestPutRecord = () => ({
  type: REQUEST_PUT_RECORD,
});

export const successPutRecord = () => ({
  type: SUCCESS_PUT_RECORD,
});

export const failurePutRecord = (error: ErrorObject) => ({
  type: FAILURE_PUT_RECORD,
  error,
});


export const ADD_ALERT = 'ADD_ALERT';
export const addAlert = (id: string, message: string, type: string): AddAlertAction => ({
  type: ADD_ALERT,
  payload: {
    id,
    message,
    type,
  },
});

export const REMOVE_ALERT = 'REMOVE_ALERT';
export const removeAlert = (id: string): RemoveAlertAction => ({
  type: REMOVE_ALERT,
  payload: {
    id,
  },
});


export const SELECT_ACTIVE_RECORD = 'SELECT_ACTIVE_RECORD';
export const selectActiveRecord = (id: string): SelectActiveRecordAction => ({
  type: SELECT_ACTIVE_RECORD,
  payload: {
    id,
  },
});

export const SET_RECORD_FORM_STYLE_ID = 'SET_RECORD_FORM_STYLE_ID';
export const setRecordFormStyleId = (styleId: string): SetRecordFormStyleIdAction => ({
  type: SET_RECORD_FORM_STYLE_ID,
  payload: {
    styleId,
  },
});


export const SET_PATIENT_LIST_FILTER = 'SET_PATIENT_LIST_FILTER';
export const setPatientListFilter = (filter: string) => ({
  type: SET_PATIENT_LIST_FILTER,
  payload: {
    filter,
  },
});
