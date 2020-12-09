import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import * as yup from 'yup';
import classNames from "classnames";

// Input feedback
const InputFeedback = ({ error }) =>
  error ? <div className={classNames("alert alert-danger")}>{error}</div> : null;

// Radio input
const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div className="form-check form-check-inline mb-4">
      <input
        name={name}
        id={id}
        type="radio"
        value={id} // could be something else for output?
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames("radio-button form-check-input")}
        {...props}
      />
      <label htmlFor={id} className="form-check-label">{label}</label>
    </div>
  );
};

// Radio group
const RadioButtonGroup = ({
  value,
  error,
  touched,
  id,
  label,
  className,
  children
}) => {
  const classes = classNames(
    "input-field",
    {
      "is-success": value || (!error && touched), // handle prefilled or user-filled
      "is-error": !!error && touched
    },
    className
  );

  return (
    <div className={classes}>
      <fieldset>
        <legend>{label}</legend>
        {children}
        {touched && <InputFeedback error={error} />}
      </fieldset>
    </div>
  );
};

const validationSchema = yup.object({
  manufacturersGroup: yup.string().required("Morate odabrati jedno vozilo"),
});

export const StepOneManufacturer = ({ formData, setFormData, nextStep }) => {
  const manufacturersList = [
    {label: 'Peugeot', value: 'peugeot'},
    {label: 'Volkswagen', value: 'volkswagen'},
    {label: 'Citroen', value: 'citroen'},
    {label: 'Audi', value: 'audi'},
    {label: 'Bmw', value: 'bmw'},
    {label: 'Seat', value: 'seat'},
    {label: 'Alfa Romeo', value: 'alfaromeo'},
    {label: 'Kia', value: 'kia'},
    {label: 'Hyundai', value: 'hyundai'},
    {label: 'Honda', value: 'honda'},
    {label: 'Toyota', value: 'toyota'}
  ];

  const manufacturers = manufacturersList.map((data, index) => {
    return <Field
      component={RadioButton}
      name="manufacturersGroup"
      id={data.value}
      label={data.label}
      key={index}
    />
  });

  return (
    <>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          nextStep();
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched, values }) => (
          <Form>
            <h6 className="form__subtitle">Korak 1. Odaberite proizvođača vašeg vozila</h6>

            <RadioButtonGroup
              id="manufacturersGroup"
              value={values.manufacturersGroup}
              error={errors.manufacturersGroup}
              touched={touched.manufacturersGroup}
              className="form-radio-group"
            >
              {manufacturers}
            </RadioButtonGroup>

            <hr/>

            <ButtonToolbar aria-label="Toolbar with button groups" className="justify-content-end">
              <ButtonGroup aria-label="Second group">
                <Button
                  type='submit'
                  variant="primary"
                >
                  Dalje
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
            
          </Form>
        )}
      </Formik>
    </>
  );
};

StepOneManufacturer.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};
