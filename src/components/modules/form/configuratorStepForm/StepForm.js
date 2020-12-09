import React, { useState } from 'react';
import { StepOneManufacturer } from './StepOneManufacturer';
import { StepTwoServices } from './StepTwoServices';
import { StepThreeContact } from './StepThreeContact';
import { StepFourConfirm } from './StepFourConfirm';
import { StepFiveSuccess } from './StepFiveSuccess';

export const StepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    manufacturersGroup: '',
    servicesGroup: '',
    cuopon: '',
    firstLastName: '',
    telephoneNumber: '',
    email: '',
    note: ''
  });
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const prevContact = () => setStep(prev => prev - 1);
  const prevServices = () => setStep(prev => prev - 2);
  const prevManufacturer = () => setStep(prev => prev - 3);
  switch (step) {
    case 1:
      return (
        <StepOneManufacturer
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      );
    case 2:
      return (
        <StepTwoServices
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 3:
      return (
        <StepThreeContact
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 4:
      return (
        <StepFourConfirm 
          formData={formData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
          prevServices={prevServices} 
          prevContact={prevContact} 
          prevManufacturer={prevManufacturer} />
      );
    default:
      return <StepFiveSuccess />;
  }
};
