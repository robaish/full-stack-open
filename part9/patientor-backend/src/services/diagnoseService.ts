import diagnoseData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnoseData;

const getEntries = (): Diagnosis[] => diagnoses;

export default {
  getEntries
};