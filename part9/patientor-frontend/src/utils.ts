import { Discharge, SickLeave } from './types';

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isDischarge = (object: any): object is Discharge => {
  return 'date' && 'criteria' in object;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSickLeave = (object: any): object is SickLeave => {
  return 'startDate' && 'endDate' in object;
};