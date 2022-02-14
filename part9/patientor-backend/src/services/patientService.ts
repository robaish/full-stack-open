import patients from '../../data/patientData';
import { NewPatient, Patient, PatientNoSSN } from '../types';
import { generateId } from '../utils';

const getPatients = (): PatientNoSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (object: NewPatient): Patient => {
  const newPatient = {
    id: generateId(),
    ...object
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};