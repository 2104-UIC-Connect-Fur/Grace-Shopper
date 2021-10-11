/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Offcanvas from 'react-bootstrap';
import OrderItem from './OrderItem';
import { store } from './State';
import { getCart } from '../api';
import { formatAsCurrency } from '../utils/formatting';

const Order = () => {
  const [userCart, updateCart] = useState(null);
  const [subTotal, updateSubtotal] = useState(null);
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
  }, []);

  if (!userCart) return (<h1>Loading...</h1>);
  return (
    <Container>
      <h1
        style={{
        //   boxShadow: '0px 5px 10px lightgrey',
          fontSize: '7vw',
        }}
      >
        YOUR ORDER
      </h1>
      <h5>Wow. Look at all this rare shit.</h5>
      {
          userCart.items.map((item) => (
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
    </Container>
  );
};

export default Order;
