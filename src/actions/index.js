export const FETCH_PATIENT_LIST = 'FETCH_PATIENT_LIST'
export const REQUEST_FETCH_PATIENT_LIST = 'REQUEST_FETCH_PATIENT_LIST'
export const SUCCESS_FETCH_PATIENT_LIST = 'SUCCESS_FETCH_PATIENT_LIST'
export const FAILURE_FETCH_PATIENT_LIST = 'FAILURE_FETCH_PATIENT_LIST'

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
