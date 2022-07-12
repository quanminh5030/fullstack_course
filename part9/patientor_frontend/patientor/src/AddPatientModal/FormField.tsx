import { useState } from 'react';
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik';
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField as TextFieldMUI,
  Button,
} from '@mui/material';
import { Diagnosis, EntryType, Gender, HealthCheckRating } from '../types';

// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
};

export type EntryTypeOption = {
  value: EntryType;
  label: string;
};

export type HealthRatingOption = {
  value: HealthCheckRating;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[] | EntryTypeOption[] | HealthRatingOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => (
  <Select defaultValue="" {...field} {...props} />
);

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: '0.5em' }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => {
  return (
    <div style={{ marginBottom: '1em' }}>
      <TextFieldMUI
        fullWidth
        label={label}
        placeholder={placeholder}
        {...field}
      />
      <Typography variant="subtitle2" style={{ color: 'red' }}>
        <ErrorMessage name={field.name} />
      </Typography>
    </div>
  );
};

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  min: number;
  max: number;
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>['setFieldValue'];
}

export const NumberField = ({
  field,
  label,
  min,
  max,
  setFieldValue,
}: NumberProps) => {
  const [value, setValue] = useState<number>();

  const setData = (value: number) => {
    setValue(value);
    setFieldValue('healthCheckRating', value);
  };

  return (
    <div style={{ marginBottom: '1em' }}>
      <TextFieldMUI
        fullWidth
        label={label}
        placeholder={String(min)}
        type="number"
        {...field}
        value={value}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value === undefined) return;
          if (value > max) setData(max);
          else if (value <= min) setData(min);
          else setData(Math.floor(value));
        }}
      />
      <Typography variant="subtitle2" style={{ color: 'red' }}>
        <ErrorMessage name={field.name} />
      </Typography>
    </div>
  );
};

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>['setFieldValue'];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>['setFieldTouched'];
}) => {
  const [open, setOpen] = useState(false);
  const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
  const field = 'diagnosisCodes';
  const onChange = (data: string[]) => {
    setDiagnoses([...data]);
    setFieldTouched(field, true);
    setFieldValue(field, selectedDiagnoses);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <FormControl style={{ width: 552, marginBottom: '30px' }}>
      <InputLabel>Diagnoses</InputLabel>
      <Select
        open={open}
        multiple
        value={selectedDiagnoses}
        onChange={(e) => onChange(e.target.value as string[])}
        input={<Input />}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.text}
          </MenuItem>
        ))}

        <Button
          sx={{ margin: '20px' }}
          onClick={() => setOpen(false)}
          variant="contained"
        >
          Finish
        </Button>
      </Select>
      <ErrorMessage name={field} />
    </FormControl>
  );
};
