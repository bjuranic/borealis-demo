import React, { Component } from 'react'
import { Row, Col, Container, Button, Modal } from 'react-bootstrap'; 
import { StepForm }  from '../form/configuratorStepForm/StepForm';
import '../../css/main.css' 

class Configurator extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Container>
          <Row>
            <Col sm={12}>
              <div className="configurator-form__wrapper">
                <h2 className="configurator-form__title">Pritisnite gumb niže kako biste pokrenuli</h2>

                <Button variant="primary" onClick={() => this.setState({ show: true })}>
                  Pokreni konfiguratior
                </Button>

                <Modal show={this.state.show} onHide={() => this.setState({ show: false })} dialogClassName="modal-800px">
                  <Modal.Header closeButton>
                    <Modal.Title>Konfigurator servisa</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <StepForm />
                  </Modal.Body>
                </Modal>
              </div>
            </Col>
          </Row>
      </Container>
    )
  }
}
export default Configurator;