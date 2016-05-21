export const FETCH_PATIENT_LIST = 'FETCH_PATIENT_LIST'
export const REQUEST_FETCH_PATIENT_LIST = 'REQUEST_FETCH_PATIENT_LIST'
export const SUCCESS_FETCH_PATIENT_LIST = 'SUCCESS_FETCH_PATIENT_LIST'
export const FAILURE_FETCH_PATIENT_LIST = 'FAILURE_FETCH_PATIENT_LIST'

export const fetchPatientList = () => ({
  type: FETCH_PATIENT_LIST,
})

export const requestFetchPatientList = () => ({
  type: REQUEST_FETCH_PATIENT_LIST,
})

export const successFetchPatientList = (patientList) => ({
  type: SUCCESS_FETCH_PATIENT_LIST,
  patientList,
})

export const failureFetchPatientList = (error) => ({
  type: FAILURE_FETCH_PATIENT_LIST,
  error,
})



export const FETCH_PATIENT_DATA = 'FETCH_PATIENT_DATA'
export const REQUEST_FETCH_PATIENT_DATA = 'REQUEST_FETCH_PATIENT_DATA'
export const SUCCESS_FETCH_PATIENT_DATA = 'SUCCESS_FETCH_PATIENT_DATA'
export const FAILURE_FETCH_PATIENT_DATA = 'FAILURE_FETCH_PATIENT_DATA'

export const fetchPatientData = (patientId) => ({
  type: FETCH_PATIENT_DATA,
  patientId,
})

export const requestFetchPatientData = () => ({
  type: REQUEST_FETCH_PATIENT_DATA,
})

export const successFetchPatientData = (patientData) => ({
  type: SUCCESS_FETCH_PATIENT_DATA,
  patientData,
})

export const failureFetchPatientData = (error) => ({
  type: FAILURE_FETCH_PATIENT_DATA,
  error,
})
