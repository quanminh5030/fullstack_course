import { State } from './state';
import { Diagnosis, Entry, Patient } from '../types';

export const SET_PATIENT_LIST = 'SET_PATIENT_LIST';
export const ADD_PATIENT = 'ADD_PATIENT';
export const GET_SINGLE_PATIENT = 'GET_SINGLE_PATIENT';
export const SET_DIAGNOSIS_LIST = 'SET_DIAGNOSIS_LIST';
export const ADD_PATIENT_ENTRY = 'ADD_PATIENT_ENTRY';

export type Action =
  | {
      type: typeof SET_PATIENT_LIST;
      payload: Patient[];
    }
  | {
      type: typeof ADD_PATIENT;
      payload: Patient;
    }
  | {
      type: typeof GET_SINGLE_PATIENT;
      payload: Patient;
    }
  | {
      type: typeof SET_DIAGNOSIS_LIST;
      payload: Diagnosis[];
    }
  | {
      type: typeof ADD_PATIENT_ENTRY;
      payload: {
        patientId: string;
        entry: Entry;
      };
    };

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: SET_PATIENT_LIST,
    payload: patientList,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: ADD_PATIENT,
    payload: patient,
  };
};

export const getSinglePatient = (patient: Patient): Action => {
  return {
    type: GET_SINGLE_PATIENT,
    payload: patient,
  };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return {
    type: SET_DIAGNOSIS_LIST,
    payload: diagnosisList,
  };
};

export const addPatientEntry = (entry: Entry, patientId: string): Action => {
  return {
    type: ADD_PATIENT_ENTRY,
    payload: { patientId, entry },
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_PATIENT_LIST:
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };

    case GET_SINGLE_PATIENT:
      return {
        ...state,
        patientFetched: {
          ...state.patientFetched,
          [action.payload.id]: action.payload,
        },
      };

    case SET_DIAGNOSIS_LIST:
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        },
      };

    case ADD_PATIENT_ENTRY:
      const currentPatient = state.patientFetched[action.payload.patientId];

      return {
        ...state,
        patientFetched: {
          ...state.patientFetched,
          [action.payload.patientId]: {
            ...currentPatient,
            entries: currentPatient.entries.concat(action.payload.entry),
          },
        },
      };

    default:
      return state;
  }
};
