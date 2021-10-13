/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import AddressEntry from './AddressEntry';
import PaymentEntry from './PaymentEntry';
import OrderItem from './OrderItem';
import { store } from './State';
import { getCart } from '../api';
import { formatAsCurrency } from '../utils/formatting';

const Order = () => {
  const { state } = useContext(store);
  const { userCart } = state;
  const [cart, updateCart] = useState(null);
  const [subTotal, updateSubtotal] = useState(null);
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
  useEffect(() => {
    const fetchCart = async () => {
      const { success, cart } = await getCart();
      if (success) {
        const fetchedSubtotal = cart.items.reduce((a, b) => a + (b.currentprice * b.quantity), 0);
        updateSubtotal(fetchedSubtotal);
        updateCart(cart);
      }
    };
    fetchCart();
  }, [userCart]);

  if (!cart) return (<h1>Loading...</h1>);
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
        <Col
          sm={12}
          md={6}
        >
          <h5
            className="mb-3"
          >
            Look at all this rare shit. You have
            {' '}
            <i>exquisite</i>
            {' '}
            taste.
          </h5>
          {
                        cart.items.map((item) => (
                          <OrderItem
                            key={item.itemId}
                            item={item}
                          />
                        ))
                    }
          <h3 className="font-weight-bold">
            Subtotal:
            {' '}
            {formatAsCurrency(subTotal)}
          </h3>
        </Col>
        <Col
          sm={12}
          md={6}
        >
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Shipping Information</Accordion.Header>
              <Accordion.Body>
                <AddressEntry
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
          </Accordion>
          <Row>
            <Button
              className="mt-5"
            >
              Place Order

            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Order;
