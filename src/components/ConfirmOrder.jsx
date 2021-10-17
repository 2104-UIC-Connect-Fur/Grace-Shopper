import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { string, number } from 'prop-types';
import { formatAsCurrency } from '../utils/formatting';

const ConfirmOrder = ({
  subTotal,
  name,
  orderStreet,
  orderApartment,
  orderCity,
  orderState,
  orderZip,
}) => {
  console.log('darrrrrr');

  return (
    <Container>
      <Row className="justify-content-center">
        <h4>ORDER TOTAL:</h4>
      </Row>
      <Row className="justify-content-center mb-2">
        {formatAsCurrency(subTotal)}
      </Row>
      <Row className="justify-content-center">
        <h4>SHIP TO:</h4>
      </Row>
      <Row className="justify-content-center">{name}</Row>
      <Row className="justify-content-center">{orderStreet}</Row>
      <Row className="justify-content-center">{orderApartment}</Row>
      <Row className="justify-content-center mb-3">
        {orderCity}
        ,
        {' '}
        {orderState}
        {' '}
        {orderZip}
      </Row>
      <Row className="justify-content-center">
        <Button type="button">Complete order</Button>
      </Row>
    </Container>
  );
};

ConfirmOrder.propTypes = {
  subTotal: number.isRequired,
  name: string.isRequired,
  orderStreet: string.isRequired,
  orderApartment: string.isRequired,
  orderCity: string.isRequired,
  orderState: string.isRequired,
  orderZip: string.isRequired,
};

export default ConfirmOrder;
