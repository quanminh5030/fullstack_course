import express from 'express';
import patientService from '../services/patientService';
import toNewEntry, { Fields } from '../utils/toNewEntry';
import toNewPatientEntry from '../utils/toNewPatientEntry';

const route = express.Router();

route.get('/', (_req, res) => {
  res.json(patientService.getNonsensitivePatients());
});

route.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

route.get('/:id', (req, res) => {
  const { id }: { id: string } = req.params;
  const patient = patientService.getSinglePatient(id);

  if (!patient) {
    res.status(400).end();
  } else {
    res.status(200).json(patient);
  }
});

route.get('/:id/entries', (req, res) => {
  const { id }: { id: string } = req.params;
  const patientEntries = patientService.getPatientEntries(id);
  res.status(200).json(patientEntries);
});

route.post('/:id/entries', (req, res) => {
  const { id }: { id: string } = req.params;
  try {
    const addedEntry = toNewEntry(req.body as Fields);

    const newEntry = patientService.addPatientEntry(id, addedEntry);
    res.status(200).json(newEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default route;
