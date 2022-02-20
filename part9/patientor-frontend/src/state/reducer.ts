import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_PATIENT_DATA";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "ADD_ENTRY";
    payload: Patient;
  }
  | {
      type: "SET_DIAGNOSES"
      payload: Diagnosis[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT_DATA":
      return {
        ...state,
        patientData: {
          ...state.patientData,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "ADD_ENTRY":
        return {
          ...state,
          patientData: {
            ...state.patientData,
            [action.payload.id]: action.payload 
          }
        };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST", 
    payload: patientListFromApi 
  };
};

export const setPatientData = (patientDetailsFromApi: Patient): Action => {
  return {
    type: "SET_PATIENT_DATA", 
    payload: patientDetailsFromApi
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const addEntry = (updatedPatient: Patient): Action => {
  return {
    type: "ADD_ENTRY",
    payload: updatedPatient
  };
};

export const setDiagnoses = (diagnosesFromApi: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES", 
    payload: diagnosesFromApi 
  };
};