/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import AddressEntry from './AddressEntry';
import PaymentEntry from './PaymentEntry';
import ConfirmOrder from './ConfirmOrder';
import OrderItem from './OrderItem';
import { store } from './State';
import { getCart, checkout } from '../api';
import { formatAsCurrency } from '../utils/formatting';

const Order = () => {
  const { state } = useContext(store);
  const { userCart } = state;
  const [cart, updateCart] = useState(null);
  const [subTotal, updateSubtotal] = useState(null);
  const [name, updateName] = useState('');
  const [orderStreet, updateOrderStreet] = useState('');
  const [orderApartment, updateOrderApartment] = useState('');
  const [orderCity, updateOrderCity] = useState('');
  const [orderState, updateOrderState] = useState('');
  const [orderZip, updateOrderZip] = useState('');
  const [nameOnCard, updateNameOnCard] = useState('');
  const [ccNumber, updateccNumber] = useState('');
  const [ccSecurityCode, updateccSecurityCode] = useState('');
  const [ccExpiration, updateccExpiration] = useState('');
  const [ccZip, updateccZip] = useState('');
  const readyToSubmit = name
    && orderStreet
    && orderCity
    && orderState
    && orderZip
    && nameOnCard
    && ccNumber
    && ccSecurityCode
    && ccExpiration
    && ccZip;
  useEffect(() => {
    const fetchCart = async () => {
      const { success, cart: fetchedCart } = await getCart();
      if (success) {
        const fetchedSubtotal = fetchedCart.items.reduce(
          (a, b) => a + b.currentprice * b.quantity,
          0,
        );
        updateSubtotal(fetchedSubtotal);
        updateCart(fetchedCart);
      }
    };
    fetchCart();
  }, [userCart]);

  const orderHandler = async () => {
    const orderObject = {
      name,
      orderStreet,
      orderApartment,
      orderCity,
      orderState,
      orderZip,
      nameOnCard,
      ccNumber,
      ccSecurityCode,
      ccExpiration,
      ccZip,
    };
    const result = await checkout(orderObject);
    console.log('orderresult: ', result);
  };

  if (!cart) return <h1>Loading...</h1>;

  if (cart && !cart.items.length) return <h1>No items in cart...</h1>;
  return (
    <Container>
      <Row>
        <h1
          style={{
            fontSize: '7vw',
            marginBottom: '1vh',
          }}
        >
          YOUR ORDER
        </h1>
      </Row>
      <Row>
        <Col sm={12} md={6}>
          <h5 className="mb-3">
            Look at all this rare shit. You have
            {' '}
            <i>exquisite</i>
            {' '}
            taste.
          </h5>
          {cart.items.map((item) => (
            <OrderItem key={item.itemId} item={item} />
          ))}
          <h3 className="font-weight-bold">
            Total:
            {' '}
            {formatAsCurrency(subTotal)}
          </h3>
        </Col>
        <Col sm={12} md={6}>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Shipping Information</Accordion.Header>
              <Accordion.Body>
                <AddressEntry
                  name={name}
                  updateName={updateName}
                  orderStreet={orderStreet}
                  updateOrderStreet={updateOrderStreet}
                  orderApartment={orderApartment}
                  updateOrderApartment={updateOrderApartment}
                  orderCity={orderCity}
                  updateOrderCity={updateOrderCity}
                  orderState={orderState}
                  updateOrderState={updateOrderState}
                  orderZip={orderZip}
                  updateOrderZip={updateOrderZip}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Payment Information</Accordion.Header>
              <Accordion.Body>
                <PaymentEntry
                  nameOnCard={nameOnCard}
                  updateNameOnCard={updateNameOnCard}
                  ccNumber={ccNumber}
                  updateccNumber={updateccNumber}
                  ccSecurityCode={ccSecurityCode}
                  updateccSecurityCode={updateccSecurityCode}
                  ccExpiration={ccExpiration}
                  updateccExpiration={updateccExpiration}
                  ccZip={ccZip}
                  updateccZip={updateccZip}
                />
              </Accordion.Body>
            </Accordion.Item>
            {readyToSubmit && (
              <Row>
                <Accordion.Item
                  eventKey="3"
                >
                  <Accordion.Header>Review and confirm order</Accordion.Header>
                  <Accordion.Body>
                    <ConfirmOrder
                      subTotal={subTotal}
                      name={name}
                      orderStreet={orderStreet}
                      orderApartment={orderApartment}
                      orderCity={orderCity}
                      orderState={orderState}
                      orderZip={orderZip}
                    />
                    <Row className="justify-content-center">
                      <Button type="button" onClick={orderHandler}>
                        Complete order
                      </Button>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Row>
            )}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Order;
