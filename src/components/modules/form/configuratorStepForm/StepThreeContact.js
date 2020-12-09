import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Button, ButtonGroup, ButtonToolbar, Row, Col } from 'react-bootstrap';
import * as yup from 'yup';

const validationSchema = yup.object({
  firstLastName: yup
    .string()
    .required('Ime i Prezime je obavezno polje')
    .max(20),
  telephoneNumber: yup
    .string()
    .required('Broj telefona je obavezno polje')
    .max(20),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email je obavezno polje')
});

export const StepThreeContact = ({
  formData,
  setFormData,
  nextStep,
  prevStep
}) => {
  const [direction, setDirection] = useState('back');
  return (
    <>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          direction === 'back' ? prevStep() : nextStep();
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <h6 className="form__subtitle">Korak 3. Vaši kontakt podaci</h6>

            <Row className="contact">
              <Col sm={6} className="contact__block">
                <div className="form-group">
                  <Field
                    type="text"
                    name='firstLastName'
                    placeholder='Ime i Prezime *'
                    className="form-control"
                    as={TextField}
                    error={touched.firstLastName && errors.firstLastName}
                  />
                  {touched.firstLastName && errors.firstLastName && <small className="form-text form-error">{errors.firstLastName}</small>}
                </div>

                <div className="form-group">
                  <Field
                    type='number'
                    name='telephoneNumber'
                    placeholder='Broj telefona *'
                    className="form-control"
                    as={TextField}
                    error={touched.telephoneNumber && errors.telephoneNumber}
                  />
                  {touched.telephoneNumber && errors.telephoneNumber && <small className="form-text form-error">{errors.telephoneNumber}</small>}
                </div>
              </Col>

              <Col sm={6} className="contact__block">
                <div className="form-group">
                  <Field
                    type='email'
                    name='email'
                    placeholder='Email *'
                    className="form-control"
                    as={TextField}
                    error={touched.email && errors.email}
                  />
                  {touched.email && errors.email && <small className="form-text form-error">{errors.email}</small>}
                </div>

                <div className="form-group">
                  <Field name='note' placeholder='Napomena (opcionalno)' className="form-control" rows={3} component="textarea" />
                  </div>
              </Col>
            </Row>

            <hr />

            <ButtonToolbar aria-label="Toolbar with button groups" className="justify-content-end">
              <ButtonGroup className="mr-2" aria-label="First group">
                <Button
                  type='submit'
                  variant="primary"
                  onClick={() => setDirection('back')}
                >
                  Nazad
                </Button>
              </ButtonGroup>

              <ButtonGroup aria-label="Second group">
                <Button
                  type='submit'
                  onClick={() => setDirection('forward')}
                  variant='primary'
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

StepThreeContact.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};
