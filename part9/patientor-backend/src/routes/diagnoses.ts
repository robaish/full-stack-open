import express from 'express';
import DiagnoseService from '../services/diagnoseService';
const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses = DiagnoseService.getEntries();
  res.send(diagnoses);
});

export default router;