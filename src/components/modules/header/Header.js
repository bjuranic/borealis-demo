import React, { Component } from "react";
import { Row, Col, Container } from 'react-bootstrap'; 
import logo from '../../img/logo.png';
import '../../css/components/header.css';

class Header extends Component {
  render() {
    return (
      <div className="header__wrapper">
        <Container>
            <Row>
              <Col sm={12}>
                <header className="header">
                  <div className="header__logo">
                    <img src={logo} className="header__logo-image" alt="logo" />
                  </div>

                  <div className="header__info">
                    <h1 className="header__title">Konfiguratior servisa</h1>
                    <h3 className="header__subtitle">Izračunajte trošak servisa</h3>
                  </div>
                </header>
              </Col>
            </Row>
        </Container>
      </div>
    );
  }
}

export default Header;