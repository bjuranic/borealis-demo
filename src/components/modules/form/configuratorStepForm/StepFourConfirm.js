import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, ButtonToolbar, Row, Col } from 'react-bootstrap';


export const StepFourConfirm = ({ formData, prevStep, nextStep, prevServices, prevContact, prevManufacturer }) => {
  const { manufacturersGroup, servicesGroup, cuopon, firstLastName, telephoneNumber, email, note } = formData;

  const servicesData = servicesGroup.map((data, index) => {
    return <li className="overview__item" key={index}>
      <div className="overview__label"></div>
      <div className="overview__value justify-content-end">{data},00 KN</div>
    </li>
  });
  
  const servicesTotal = servicesGroup.reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  const discount = cuopon === 'Tokić123' ? servicesTotal * 0.3 : 0;
  const servicesTotalRound = parseFloat(servicesTotal).toFixed(2);
  const discountRound = discount.toFixed(2);
  const totalPrice = servicesTotalRound - discountRound;
  const totalRound = totalPrice.toFixed(2);

  return (
    <>
      <div>
          <div className="form__header">
            <h6 className="form__subtitle">Korak 4. Pregled i potvrda vašeg odabira</h6>
            <p className="form__text">Molimo vas da još jednom pregledate i potvrdite unesene podatke. Ukoliko želite promjeniti neke od podataka,
            možete pritisnuti gumb za uređivanje pored svake od kategorija. Kada ste provjerili i potvrdili ispravnost svojih podataka pritisnute gumb
            pošalji na dnu, za slanje upita za servis.</p>
          </div>

          <Row className="overview">
            <Col sm={6} className="overview__block">
              {/* MODEL */}
              <div className="overview__header">
                <h5 className="overview__title text-uppercase">
                  Model vozila
                </h5>
                <Button
                  className="overview__link"
                  size="sm"
                  variant='warning'
                  onClick={() => prevManufacturer()}
                >
                  Uredi
                </Button>
              </div>

              <div className="overview__info">
                <ul className="overview__list">
                  <li className="overview__item">
                    <div className="overview__label">{manufacturersGroup}</div>
                  </li>
                </ul>
              </div>
            </Col>

            <Col sm={6} className="overview__block">
              {/* USLUGE */}
              <div className="overview__header">
                <h5 className="overview__title text-uppercase">
                  Odabrane usluge
                </h5>
                <Button
                  className="overview__link"
                  size="sm"
                  variant='warning'
                  onClick={() => prevServices()}
                >
                  Uredi
                </Button>
              </div>

              <div className="overview__info">
                <ul className="overview__list">
                  {servicesData}
                  <li className="overview__item justify-content-end">
                    <div className="overview__value">Popust (30%): -{discountRound} KN</div>
                  </li>
                  <li className="overview__item justify-content-end">
                    <div className="overview__value ">UKUPNO: <b>{totalRound} KN</b></div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>

          <hr/>

          <Row className="overview">
            <Col sm={12} className="overview__block">
              {/* KONTAKT */}
              <div className="overview__header">
                <h5 className="overview__title text-uppercase">
                  Kontakt podaci
                </h5>
                <Button
                  className="overview__link"
                  size="sm"
                  variant='warning'
                  onClick={() => prevContact()}
                >
                  Uredi
                </Button>
              </div>
            </Col>

            <Col sm={6} className="overview__block">
              <div className="overview__info">
                <ul className="overview__list">
                  <li className="overview__item">
                    <div className="overview__label">Ime i Prezime:</div>
                    <div className="overview__value">{firstLastName}</div>
                  </li>

                  <li className="overview__item">
                    <div className="overview__label">Broj telefona:</div>
                    <div className="overview__value">{telephoneNumber}</div>
                  </li>
                </ul>
              </div>
            </Col>

            <Col sm={6} className="overview__block">
              <div className="overview__info">
                <ul className="overview__list">
                  <li className="overview__item">
                    <div className="overview__label">Email:</div>
                    <div className="overview__value">{email}</div>
                  </li>

                  <li className="overview__item">
                    <div className="overview__label">Napomena:</div>
                    <div className="overview__value">{note}</div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>

          <hr />

          <ButtonToolbar aria-label="Toolbar with button groups" className="justify-content-end">
            <ButtonGroup className="mr-2" aria-label="First group">
              <Button
                type='submit'
                variant="primary"
                onClick={() => prevStep()}
              >
                Nazad
              </Button>
            </ButtonGroup>

            <ButtonGroup aria-label="Second group">
              <Button
                type='submit'
                onClick={() => nextStep()}
                variant='success'
              >
                Pošalji
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
      </div>
    </>
  );
};

StepFourConfirm.propTypes = {
  formData: PropTypes.object.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};
