import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Button, ButtonGroup, ButtonToolbar, Row, Col } from 'react-bootstrap';
import * as yup from 'yup';
import classNames from "classnames";

// Input feedback
const InputFeedback = ({ error }) =>
  error ? <div className={classNames("alert alert-danger")}>{error}</div> : null;


// Checkbox input
const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  price,
  className,
  ...props
}) => {
  return (
    <div className="form-check form-check-inline mb-4">
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        price={price}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames("radio-button form-check-input")}
      />
      <label htmlFor={id} className="form-check-label">{label} {`(` + `${id}` + `,00 kn)`}</label>
      {touched[name] && <InputFeedback error={errors[name]} />}
    </div>
  );
};

// Checkbox group
class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0
    };
  }

  handleChange = event => {
    const target = event.currentTarget;
    let valueArray = [...this.props.value] || [];
    
    if (target.checked) {
      valueArray.push(target.id);
    } else {
      valueArray.splice(valueArray.indexOf(target.id), 1);
    }

    this.props.onChange(this.props.id, valueArray);
  };

  handleBlur = () => {
    // take care of touched
    this.props.onBlur(this.props.id, true);
  };

  render() {
    const { value, error, touched, label, className, children } = this.props;

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
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              field: {
                value: value.includes(child.props.id),
                onChange: this.handleChange,
                onBlur: this.handleBlur
              }
            });
          })}
          {touched && <InputFeedback error={error} />}

          <div className="total">
            <div className="total__label">Ukupno:</div>
            {<div className="total__value">{`(` + `${value && value.length ? value.reduce((acc, curr) => acc + parseInt(curr, 10), 0) : '0' }` + `,00 kn)`}</div>}
          </div>
          
        </fieldset>
      </div>
    );
  }
}

const validationSchema = yup.object({
  servicesGroup: yup.string().required("Minimalno jedna usluga mora biti odabrana"),
  cuopon: yup.string().matches(/^[Tokić123]+$/,  "Unesi ispravni kupon"),
});

export const StepTwoServices = ({ formData, setFormData, nextStep, prevStep }) => {
  const [direction, setDirection] = useState('back');

  const servicesList = [
    {label: 'Zamjena ulja i filtera', value: '500',},
    {label: 'Promjena pakni', value: '450'},
    {label: 'Promjena guma', value: '100'},
    {label: 'Servis klima uređaja', value: '299'},
    {label: 'Balansiranje guma', value: '50'},
    {label: 'Zamjena ulja u kočnicama', value: '229'}
  ];

  const services = servicesList.map((data, index) => {
    return <Field
      component={Checkbox}
      name="servicesGroup"
      id={data.value}
      label={data.label}
      key={index}
    />
  });

  const [showCuopon, setShowCuopon] = useState(false);

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
        {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
          <Form>
            <h6 className="form__subtitle">Korak 2. Odaberite jednu ili više usluga za koju ste</h6>

            <CheckboxGroup
              id="servicesGroup"
              value={values.servicesGroup}
              error={errors.servicesGroup}
              touched={touched.servicesGroup}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              className="form-checkbox-group"
            >
              {services}
            </CheckboxGroup>

            <Row className="justify-content-end">
              <Col sm={4}>
                <div className="hidden__block">
                  {
                    showCuopon ? 
                    null :
                    <Button
                      variant="link"
                      onClick={() => setShowCuopon(!showCuopon)}
                    >
                      Imam kupon
                    </Button>
                  } 

                  {
                    showCuopon ? 
                    <div className="form-group">
                      <Field 
                        name='cuopon' 
                        className="form-control" 
                        type="text" 
                        component="input"
                        placeholder="Unesi kod kupona ovdje"
                        error={touched.cuopon && errors.cuopon} 
                      />
                      {touched.cuopon && errors.cuopon && <small className="form-text form-error">{errors.cuopon}</small>}
                    </div>
                    : 
                    null
                  }
                  
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
                  variant="primary"
                  onClick={() => setDirection('forward')}
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

StepTwoServices.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};
