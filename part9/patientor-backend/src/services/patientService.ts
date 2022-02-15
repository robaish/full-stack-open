import patients from '../../data/patientData';
import { NewPatient, Patient, PublicPatient } from '../types';
import { generateId } from '../utils';

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
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
  getPatient,
  addPatient
};