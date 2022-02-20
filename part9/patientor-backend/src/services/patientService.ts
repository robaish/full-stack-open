import patients from '../../data/patientData';
import { NewEntry, NewPatient, Patient, PublicPatient } from '../types';
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

const addEntry = (patientId: string, object: NewEntry): Patient => {
  const patient = patients.find(p => p.id === patientId);

  if (!patient) {
    throw new Error('Patient not found.');
  }

  const newEntry = {
    id: generateId(),
    ...object
  };
  
  patient.entries.push(newEntry);
  return patient;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry
};