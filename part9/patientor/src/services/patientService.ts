import { v4 as uuidv4 } from 'uuid';
import patientEntries from '../../data/patients';
import {
  Entry,
  NewEntry,
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from '../types';

const getPatients = (): Patient[] => {
  return patientEntries;
};

const getNonsensitivePatients = (): NonSensitivePatient[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...entry,
  };

  patientEntries.push(newPatient);
  return newPatient;
};

const getSinglePatient = (id: string): Patient | undefined => {
  const patient = patientEntries.find((patient: Patient) => patient.id === id);
  return patient;
};

const getPatientEntries = (id: string): Entry[] | undefined => {
  const patient = patientEntries.find((p: Patient) => p.id === id);
  return patient?.entries;
};

const addPatientEntry = (id: string, entry: NewEntry): Entry => {
  console.log('this', entry);
  const newEntry = {
    id: uuidv4(),
    ...entry,
  };
  const patient = patientEntries.find((p: Patient) => p.id === id);
  patient?.entries.push(newEntry as Entry);
  return newEntry as Entry;
};

export default {
  getPatients,
  getNonsensitivePatients,
  addPatient,
  getSinglePatient,
  getPatientEntries,
  addPatientEntry,
};
