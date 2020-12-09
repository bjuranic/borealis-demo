import React from 'react';
import { Button, ButtonToolbar} from 'react-bootstrap'; 

export const StepFiveSuccess = () => {

  return (
    <div>
      <div className="form__header text-center">
        <h6 className="form__subtitle">Vaša prijava je uspješno poslana</h6>
        <p className="form__text">vaša prijava je uspješno poslana i zaprimljena. Kontaktirati ćemo vas u najkračem mogućem roku.</p>
      </div>

      <ButtonToolbar aria-label="Toolbar with button groups" className="justify-content-center">
        <Button variant="primary">
          Zatvori
        </Button>
      </ButtonToolbar>
    </div>
  );
};
