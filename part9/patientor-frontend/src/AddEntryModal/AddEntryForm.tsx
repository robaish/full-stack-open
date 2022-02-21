import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import { DiagnosisSelection, EntryOption, NumberField, SelectField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { Discharge, EntryType, SickLeave } from '../types';
import { isDate, isDischarge, isSickLeave, isString } from '../utils';

export type EntryFormValues = {
  date: string,
  specialist: string,
  type: unknown,
  description: string,
  diagnosisCodes?: unknown,
  discharge?: Discharge,
  employerName?: unknown,
  sickLeave?: SickLeave,
  healthCheckRating?: number
};

type DischargeValues = { [field: string] : {
  date?: string;
  criteria?: string;
}};

type SickLeaveValues = { [field: string] : {
  startDate?: string;
  endDate?: string;
}};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryOptions: EntryOption[] = [
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational healthcare" },
  { value: EntryType.HealthCheck, label: "Health check" }
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
    initialValues={{
      date: '',
      specialist: '',
      type: EntryType.Hospital,
      description: '',
      diagnosisCodes: [],
      healthCheckRating: 0
    }}
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = 'Field is required';
      const formatError = 'Field is wrongly formatted';
      
      const errors: { [field: string]: string } | DischargeValues | SickLeaveValues = {};
      
      if (!values.date || values.date === '') {
        errors.date = requiredError;
      } else if (!isDate(values.date) || values.date.length !== 10) {
        errors.date = formatError;
      }
      
      if (!values.specialist) {
        errors.specialist = requiredError;
      } else if (!isString(values.specialist)) {
        errors.specialist = formatError;
      }

      if (!values.description) {
        errors.description = requiredError;
      } else if (!isString(values.description)) {
        errors.description = formatError;
      }

      switch (values.type) {
        case EntryType.Hospital:
          if (values.discharge && isDischarge(values.discharge)) {
            if (values.discharge.date && values.discharge.date.length > 0) {
              if (!isDate(values.discharge.date) || values.discharge.date.length !== 10) {
                errors.discharge = {
                  date: formatError
                };
              } else if (!values.discharge.criteria) {
                errors.discharge = {
                  criteria: 'Please provide criteria if you enter a discharge date.'
                };
              }
            }
          }
          return errors;
          break;
        case EntryType.OccupationalHealthcare:
          if (values.sickLeave && isSickLeave(values.sickLeave)) {
            if (values.sickLeave.startDate && values.sickLeave.startDate.length > 0) {
              if (!isDate(values.sickLeave.startDate) || values.sickLeave.startDate.length !== 10) {
                errors.sickLeave = {
                  startDate: formatError
                };
              } else if (!values.sickLeave.endDate) {
                errors.sickLeave = {
                  endDate: 'Please provide an end date for the sick leave'
                };
              } else if (!isDate(values.sickLeave.endDate) || values.sickLeave.endDate.length !== 10) {
                errors.sickLeave = {
                  endDate: formatError
                };
              } 
            }
          }
          return errors;
          break;
        case EntryType.HealthCheck:
          if (values.healthCheckRating === undefined) {
            errors.healthCheckRating = requiredError;
          } else if (values.healthCheckRating > 3) {
            errors.healthCheckRating = 'Value must be between 0 and 3';
          } else if (![0,1,2,3].includes(values.healthCheckRating)) {
            errors.healthCheckRating = requiredError;
          }
          return errors;
          break;
        default:
          return errors;
          break;
      }
    }}
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {

      return (
        <Form className="form ui">
          <SelectField
            label="Entrytype *"
            name="type"
            options={entryOptions}
            />
          <Field
            label="Date *"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <Field
            label="Specialist  *"
            placeholder="First name and last name"
            name="specialist"
            component={TextField}
          />
          <Field
            label="Description  *"
            placeholder="Description of visit"
            name="description"
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          {values.type === EntryType.Hospital &&
            <>
              <Header as={'h4'} content={'Discharge'} />
              <Field
                label="Discharge date"
                placeholder="YYYY-MM-DD"
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
          }
          {values.type === EntryType.OccupationalHealthcare &&
            <>
              <Header as={'h4'} content={'Sick leave'} />
              <Field
                label="Start date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
              />
              <Field
                label="End date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
                component={TextField}
              />
            </>
          }
          {values.type === EntryType.HealthCheck &&
            <Field
              label="Health check rating"
              helperText="0 = healthy, 1 = low risk, 2 = high risk, 3 = critical risk"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
          />
          }
          <Button type="button" onClick={onCancel}>Cancel</Button>
          <Button
            type="submit"
            disabled={!dirty || !isValid}
            color="green"
          >
            Add entry
          </Button>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;