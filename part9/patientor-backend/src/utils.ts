import { v4 as uuid } from 'uuid';
import { Gender, NewPatient, NewEntry, EntryType, Discharge, SickLeave, HealthCheckRating, Diagnosis } from './types';

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export const generateId = (): string => {
  const id: string = uuid();
  return id;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing value: ' + text);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseType = (type: any): EntryType => {
  if (!type || !isEntryType) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return type;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (object: any): object is Discharge => {
  return 'date' && 'criteria' in object;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || !isDischarge(object)) throw new Error('Missing or incorrect discharge: ' + object);
  
  return {
    date: parseDate(object.date),
    criteria: parseString(object.criteria)
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (object: any): object is SickLeave => {
  return 'startDate' && 'endDate' in object;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || !isSickLeave(object)) throw new Error('Missing or incorrect discharge: ' + object);
  
  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing rating: ' + rating);
  }
  return rating;
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> => {
  if (!codes || !Array.isArray(codes) || codes.some(code => !isString(code))) {
    throw new Error('Incorrect or missing diagnostic codes: ' + codes);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return codes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: any };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entries: entries
  };
  return newPatient;
};

type EntryFields = {
  date: unknown,
  specialist: unknown,
  type: unknown,
  description: unknown,
  diagnosisCodes?: unknown,
  discharge?: unknown,
  employerName?: unknown,
  sickLeave?: unknown,
  healthCheckRating?: unknown
};

export const toNewEntry = ({ date, specialist, type, description, ...rest }: EntryFields): NewEntry => {
  const newEntry: NewEntry = {
    date: parseDate(date),
    specialist: parseString(specialist),
    type: parseType(type),
    description: parseString(description),
  };

  if (rest.diagnosisCodes) {
    newEntry.diagnosisCodes = parseDiagnosisCodes(rest.diagnosisCodes);
  }

  console.log(newEntry);

  switch (newEntry.type) {
    case EntryType.Hospital:
      const newHospitalEntry = {
        ...newEntry,
        discharge: parseDischarge(rest.discharge)
      };
      return newHospitalEntry;
      break;
    case EntryType.OccupationalHealthcare:
      const newOccupationalEntry = {
        ...newEntry,
        employerName: parseString(rest.employerName),
        sickLeave: parseSickLeave(rest.sickLeave)
      };
      return newOccupationalEntry;
      break;
    case EntryType.HealthCheck:
      const newHealthCheckEntry = {
        ...newEntry,
        healthCheckRating: parseHealthCheckRating(rest.healthCheckRating)
      };
      return newHealthCheckEntry;
    default:
      return assertNever(newEntry);
      break;
  }
};