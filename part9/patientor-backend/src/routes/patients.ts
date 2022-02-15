import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getPatients();
  res.json(patients);
});

router.get('/:id', (req, res) => {
  try {
    const patient = patientService.getPatient(req.params.id);
    res.json(patient); 
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;