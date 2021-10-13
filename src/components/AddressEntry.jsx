import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { string, func } from 'prop-types';

const AddressEntry = ({
  orderStreet,
  updateOrderStreet,
  orderApartment,
  updateOrderApartment,
  orderCity,
  updateOrderCity,
  orderState,
  updateOrderState,
  orderZip,
  updateOrderZip,
}) => (
  <Form>
    <Form.Group as={Row} className="mb-3" controlId="Title">
      <Form.Label as={Row}>
        Street
      </Form.Label>
      <Form.Control
        size="lg"
        type="text"
        placeholder="street"
        value={orderStreet}
        onChange={(event) => {
          updateOrderStreet(event.target.value);
        }}
      />
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="Title">
      <Form.Label as={Row}>
        Apartment (optional)
      </Form.Label>
      <Form.Control
        size="lg"
        type="text"
        placeholder="apartment"
        value={orderApartment}
        onChange={(event) => {
          updateOrderApartment(event.target.value);
        }}
      />
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="Title">
      <Form.Label as={Row}>
        City
      </Form.Label>
      <Form.Control
        size="lg"
        type="text"
        placeholder="city"
        value={orderCity}
        onChange={(event) => {
          updateOrderCity(event.target.value);
        }}
      />
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="Title">
      <Form.Label as={Row}>
        State
      </Form.Label>
      <Form.Control
        size="lg"
        type="text"
        placeholder="state"
        value={orderState}
        onChange={(event) => {
          updateOrderState(event.target.value);
        }}
      />
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="Title">
      <Form.Label as={Row}>
        Zip Code
      </Form.Label>
      <Form.Control
        size="lg"
        type="text"
        placeholder="zip code"
        value={orderZip}
        onChange={(event) => {
          updateOrderZip(event.target.value);
        }}
      />
    </Form.Group>
  </Form>
);

AddressEntry.propTypes = {
  orderStreet: string.isRequired,
  updateOrderStreet: func.isRequired,
  orderApartment: string.isRequired,
  updateOrderApartment: func.isRequired,
  orderCity: string.isRequired,
  updateOrderCity: func.isRequired,
  orderState: string.isRequired,
  updateOrderState: func.isRequired,
  orderZip: string.isRequired,
  updateOrderZip: func.isRequired,
};

export default AddressEntry;
