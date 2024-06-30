import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './CheckoutSteps.css'

    export default function CheckoutSteps({ currentStep }) {
        return (
          <div style={{ width: '100%', display: 'flex',justifyContent:'center' }}>
            <Row className="checkout-steps" style={{ width: '100%', display: 'flex',justifyContent:'center'}}>
              <Col className={currentStep >= 1 ? 'completed' : '' + currentStep === 1 ? 'activeone' : ''}>Etape1</Col>
              <Col className={currentStep >= 2 ? 'completed' : '' + currentStep === 2 ? 'activeone' : ''}>Etape2</Col>
              <Col className={currentStep >= 3 ? 'completed' : '' + currentStep === 3 ? 'activeone' : ''}>Etape3</Col>
              <Col className={currentStep >= 4 ? 'completed' : '' + currentStep === 4 ? 'activeone' : ''}>Etape4</Col>
            </Row>
          </div>
       
  )
}