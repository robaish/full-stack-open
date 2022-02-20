import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'semantic-ui-react';
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HealthCheckEntry } from '../types';
import { isDate, isString } from '../utils';

export type EntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
    initialValues={{
      date: '',
      specialist: '',
      type: 'HealthCheck',
      description: '',
      diagnosisCodes: [],
      healthCheckRating: 0
    }}
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = 'Field is required';
      const formatError = 'Field is wrongly formatted';
      const errors: { [field: string]: string } = {};
      
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

      if (values.healthCheckRating > 3) {
        errors.healthCheckRating = 'Value must be between 0 and 3';
      } else if (![0,1,2,3].includes(values.healthCheckRating)) {
        errors.healthCheckRating = requiredError;
      }
      return errors;
    }}
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="First name and last name"
            name="specialist"
            component={TextField}
          />
          <Field
            label="Description"
            placeholder="Description of visit"
            name="description"
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          <Field
            label="Health check rating"
            helperText="0 = healthy, 1 = low risk, 2 = high risk, 3 = critical risk"
            name="healthCheckRating"
            component={NumberField}
            min={0}
            max={3}
          />
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