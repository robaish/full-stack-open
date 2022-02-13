import patientData from '../../data/patients.json';
import { PatientNoSSN } from '../types';

const patients: PatientNoSSN[] = patientData;

const getEntries = (): PatientNoSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getEntries
};