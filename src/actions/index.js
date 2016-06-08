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


export const FETCH_PATIENT = 'FETCH_PATIENT'
export const REQUEST_FETCH_PATIENT = 'REQUEST_FETCH_PATIENT'
export const SUCCESS_FETCH_PATIENT = 'SUCCESS_FETCH_PATIENT'
export const FAILURE_FETCH_PATIENT = 'FAILURE_FETCH_PATIENT'

export const fetchPatient = (patientId) => ({
  type: FETCH_PATIENT,
  patientId,
})

export const requestFetchPatient = () => ({
  type: REQUEST_FETCH_PATIENT,
})

export const successFetchPatient = (patient) => ({
  type: SUCCESS_FETCH_PATIENT,
  patient,
})

export const failureFetchPatient = (error) => ({
  type: FAILURE_FETCH_PATIENT,
  error,
})


export const PUT_PATIENT = 'PUT_PATIENT'
export const REQUEST_PUT_PATIENT = 'REQUEST_PUT_PATIENT'
export const SUCCESS_PUT_PATIENT = 'SUCCESS_PUT_PATIENT'
export const FAILURE_PUT_PATIENT = 'FAILURE_PUT_PATIENT'

export const putPatient = (patient) => ({
  type: PUT_PATIENT,
  patient,
})

export const requestPutPatient = () => ({
  type: REQUEST_PUT_PATIENT,
})

export const successPutPatient = () => ({
  type: SUCCESS_PUT_PATIENT,
})

export const failurePutPatient = (error) => ({
  type: FAILURE_PUT_PATIENT,
  error,
})
