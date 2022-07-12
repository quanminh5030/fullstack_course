import diagnoseEntries from '../../data/diagnoses';
import { Diagnose } from '../types';

const getDiagnoses = (): Diagnose[] => {
  return diagnoseEntries;
};

export default {
  getDiagnoses,
};
