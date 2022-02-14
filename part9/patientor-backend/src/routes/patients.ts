/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getPatients();
  res.json(patients);
});

router.post('/', (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = patientService.addPatient({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation
    });
    res.json(newPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;