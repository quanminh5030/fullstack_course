import { Button, Grid } from '@mui/material';
import moment from 'moment';
import { Field, Form, Formik } from 'formik';
import {
  DiagnosisSelection,
  EntryTypeOption,
  SelectField,
  TextField,
} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { Entry, EntryType } from '../types';
import { OptionalField } from './OptionalField';

export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: 'Health Check' },
  { value: EntryType.Hospital, label: 'Hospital' },
  {
    value: EntryType.OccupationalHealthcare,
    label: 'Occupational Health Care',
  },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: '',
        specialist: '',
        description: '',
        type: EntryType.HealthCheck,
        diagnosisCodes: [],
        healthCheckRating: '',
        discharge: {
          date: '',
          criteria: '',
        },
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const stringError = 'data must be in string';
        const dateFormat = 'YYYY-MM-DD';
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (Number(values.description)) {
          errors.description = stringError;
        }
        if (Number(values.specialist)) {
          errors.specialist = stringError;
        }
        if (!moment(values.date, dateFormat, true).isValid()) {
          errors.date = 'date must be in the format YYYY-MM-DD';
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={entryTypeOptions} />

            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />

            <Field
              label="Specialist"
              placeholder="Name of the Specialist"
              name="specialist"
              component={TextField}
            />

            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <OptionalField type={values.type} />

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
