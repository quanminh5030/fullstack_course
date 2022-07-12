import { Field } from 'formik';
import {
  HealthRatingOption,
  SelectField,
  TextField,
} from '../AddPatientModal/FormField';
import { EntryType, HealthCheckRating } from '../types';

const healthRatingOptions: HealthRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: '0' },
  { value: HealthCheckRating.LowRisk, label: '1' },
  { value: HealthCheckRating.HighRisk, label: '2' },
  { value: HealthCheckRating.CriticalRisk, label: '3' },
];

export const OptionalField = ({ type }: { type: EntryType }) => {
  switch (type) {
    case EntryType.HealthCheck:
      return <HealthRating />;

    case EntryType.Hospital:
      return <Discharge />;

    case EntryType.OccupationalHealthcare:
      return <OccupationalField />;

    default:
      return null;
  }
};

const HealthRating = () => (
  <SelectField
    label="Health Rating"
    name="healthCheckRating"
    options={healthRatingOptions}
  />
);

const Discharge = () => (
  <>
    <Field
      label="Discharge date"
      placeholder="Discharge date"
      name="discharge.date"
      component={TextField}
    />
    <Field
      label="Criteria"
      placeholder="Criteria"
      name="discharge.criteria"
      component={TextField}
    />
  </>
);

const OccupationalField = () => (
  <>
    <Field
      label="Employer name"
      placeholder="Employer name"
      name="employerName"
      component={TextField}
    />
    <Field
      label="Sick leave start"
      placeholder="Sick leave start date"
      name="sickLeave.startDate"
      component={TextField}
    />
    <Field
      label="Sick leave end"
      placeholder="Sick leave end date"
      name="sickLeave.endDate"
      component={TextField}
    />
  </>
);
