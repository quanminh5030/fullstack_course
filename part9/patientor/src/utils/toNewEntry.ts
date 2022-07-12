import { EntryType, NewEntry } from '../types';
import { isDate, isString } from './toNewPatientEntry';

export type Fields = {
  date: unknown;
  specialist: unknown;
  type: unknown;
  description: unknown;
};

const toNewEntry = ({
  date,
  specialist,
  type,
  description,
  ...entry // for non-required field
}: Fields): NewEntry => {
  const newEntry: NewEntry = {
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    type: parseType(type),
    description: parseDescription(description),
    ...entry,
  };

  if (newEntry.healthCheckRating === '') delete newEntry.healthCheckRating;

  if (!newEntry.discharge?.criteria && !newEntry.discharge?.date)
    delete newEntry.discharge;

  if (
    !newEntry.employerName &&
    !newEntry.sickLeave?.startDate &&
    !newEntry.sickLeave?.endDate
  ) {
    delete newEntry.employerName;
    delete newEntry.sickLeave;
  }

  return newEntry;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseDescription = (desc: unknown): string => {
  if (!desc || !isString(desc)) {
    throw new Error('Incorrect or missing descripion: ' + desc);
  }
  return desc;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// type guard
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

export default toNewEntry;
