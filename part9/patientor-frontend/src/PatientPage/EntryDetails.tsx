import React from 'react';
import { Diagnosis, Entry } from '../types';
import { assertNever } from '../utils';
import HealthCheck from './HealthCheckEntry';
import Hospital from './HospitalEntry';
import Occupational from './OccupationalHealthcareEntry';

const EntryDetails = ({ entry, diagnosisArray }: {
  entry: Entry,
  diagnosisArray: Diagnosis[]
}) => {
    switch (entry.type) {
      case 'HealthCheck':
        return <HealthCheck entry={entry} diagnosisArray={diagnosisArray} />;
        break;
      case 'Hospital':
        return <Hospital entry={entry} diagnosisArray={diagnosisArray} />;
        break;
      case 'OccupationalHealthcare':
        return <Occupational entry={entry} diagnosisArray={diagnosisArray} />;
      default:
        return assertNever(entry);
        break;
    }
};

export default EntryDetails;