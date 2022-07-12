export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

// entries type
export type Entry = HealthCheckEntry | HospitalEntry | OccupationalEntry;

export type NewEntry = Omit<Entry, 'id'>;

interface BaseEntry {
  id: string;
  date: string;
  type: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnose['code']>;
  healthCheckRating?: number | string | undefined;
  discharge?: {
    date: string;
    criteria: string;
  };
  employerName?: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export enum EntryType {
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating?: HealthCheckRating;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge?: Discharge;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName?: string;
  sickLeave?: SickLeave;
}
