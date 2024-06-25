import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './CheckoutSteps.css'

    export default function CheckoutSteps({ currentStep }) {
        return (
            <Row className="checkout-steps" style={{ marginTop: '120px', display: 'flex' }}>
      <Col className={currentStep >= 1 ? 'completed' : '' + currentStep === 1 ? 'activeone' : ''}>Participant</Col>
      <Col className={currentStep >= 2 ? 'completed' : '' + currentStep === 2 ? 'activeone' : ''}>Catégorie</Col>
      <Col className={currentStep >= 3 ? 'completed' : '' + currentStep === 3 ? 'activeone' : ''}>Questions/Réponses</Col>
    </Row>
       
  )
}