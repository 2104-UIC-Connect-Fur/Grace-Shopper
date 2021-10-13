import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { string, func } from 'prop-types';

const PaymentEntry = ({
  nameOnCard,
  updateNameOnCard,
  ccNumber,
  updateccNumber,
  ccSecurityCode,
  updateccSecurityCode,
  ccExpiration,
  updateccExpiration,
  ccZip,
  updateccZip,
//   billingZipCode,
//   updateBillingZipCode,
//   billingStreet,
//   updateBillingStreet,
//   billingApartment,
//   updateBillingApartment,
//   billingCity,
//   updateBillingCity,
//   billingState,
//   updateBillingState,
}) => (
  <Form>
    <Form.Group as={Row} className="mb-3" controlId="Title">
      <Form.Label as={Row}>
        Name on card
      </Form.Label>
      <Form.Control
        size="lg"
        type="text"
        placeholder="Name"
        value={nameOnCard}
        onChange={(event) => {
          updateNameOnCard(event.target.value);
        }}
      />
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="Title">
      <Form.Label as={Row}>
        Card Number
      </Form.Label>
      <Form.Control
        size="lg"
        type="text"
        placeholder="Card Number"
        value={ccNumber}
        onChange={(event) => {
          updateccNumber(event.target.value);
        }}
      />
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="Title">
      <Form.Label as={Row}>
        Expiration
      </Form.Label>
      <Form.Control
        size="lg"
        type="text"
        placeholder="Expiration"
        value={ccExpiration}
        onChange={(event) => {
          updateccExpiration(event.target.value);
        }}
      />
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="Title">
      <Form.Label as={Row}>
        Security Code
      </Form.Label>
      <Form.Control
        size="lg"
        type="text"
        placeholder="Security Code"
        value={ccSecurityCode}
        onChange={(event) => {
          updateccSecurityCode(event.target.value);
        }}
      />
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="Title">
      <Form.Label as={Row}>
        Credit card account zip code
      </Form.Label>
      <Form.Control
        size="lg"
        type="text"
        placeholder="zip code"
        value={ccZip}
        onChange={(event) => {
          updateccZip(event.target.value);
        }}
      />
    </Form.Group>
  </Form>
);

PaymentEntry.propTypes = {
  nameOnCard: string.isRequired,
  updateNameOnCard: func.isRequired,
  ccNumber: string.isRequired,
  updateccNumber: func.isRequired,
  ccSecurityCode: string.isRequired,
  updateccSecurityCode: func.isRequired,
  ccExpiration: string.isRequired,
  updateccExpiration: func.isRequired,
  ccZip: string.isRequired,
  updateccZip: func.isRequired,
//   billingZipCode: string.isRequired,
//   updateBillingZipCode: func.isRequired,
//   billingStreet: string.isRequired,
//   updateBillingStreet: func.isRequired,
//   billingApartment: string.isRequired,
//   updateBillingApartment: func.isRequired,
//   billingCity: string.isRequired,
//   updateBillingCity: func.isRequired,
//   billingState: string.isRequired,
//   updateBillingState: func.isRequired,
};

export default PaymentEntry;
