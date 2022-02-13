import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnoseData;

const getEntries = (): Diagnose[] => diagnoses;

export default {
  getEntries
};