import React, { useContext, useState } from 'react';
import {
  Offcanvas, ListGroup, Button, Row, Col,
} from 'react-bootstrap';
import { store } from './State';
import { formatAsCurrency } from '../utils';
import deleteIcon from '../images/deleteIcon.svg';
import plus from '../images/plus.png';
import minus from '../images/minus.png';
import { addOrSubtractItem } from '../api';

const Cart = ({ cartShow, setCartShow }) => {
  const { state, dispatch } = useContext(store);
  const { isLoggedIn, username, userCart } = state;
  //   const [runningTotal, setRunningTotal] = useState(0);

  if (!userCart) {
    return '';
  }
  const subtotalArr = userCart.items.map((item) => item.currentprice * item.quantity);
  const subtotal = subtotalArr.reduce((a, b) => a + b, 0);
  //   console.log(subtotal);

  const addHandler = async (currItem) => {
    // eslint-disable-next-line max-len
    const result = await addOrSubtractItem(userCart.orderId, currItem.itemId, currItem.quantity + 1);
    console.log(result);
  };

  const subtractHandler = async (currItem) => {
    if (currItem.quantity > 0) {
      // eslint-disable-next-line max-len
      const result = await addOrSubtractItem(userCart.orderId, currItem.itemId, currItem.quantity - 1);
      console.log(result);
    }
  };

  const updateCart = (cartObject) => {
    dispatch({
      action: 'updateCart',
      value: cartObject,
    });
  };

  return (
    <Offcanvas show={cartShow} onHide={() => setCartShow(false)} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{username ? `${username}'s cart` : 'Your cart'}</Offcanvas.Title>
      </Offcanvas.Header>
      <ListGroup variant="flush">
        {userCart.items.map((item) => (
          <ListGroup.Item>
            <Row>
              <Col>
                {item.title}
              </Col>
              <Col xs={2}>
                <img
                  src={deleteIcon}
                  width="auto"
                  height="12"
                  className="justify-end"
                  alt="x-shaped delete button"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p><b>{formatAsCurrency(item.currentprice)}</b></p>
              </Col>
              <Col xs={3}>
                <img
                  onClick={() => { subtractHandler(item); }}
                  src={minus}
                  width="auto"
                  height="16"
                  className="justify-end"
                  alt="decrement item count"
                />
                {` ${item.quantity} `}
                <img
                  onClick={() => { addHandler(item); }}
                  src={plus}
                  width="auto"
                  height="16"
                  className="justify-end"
                  alt="increment item count"
                />
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          <Row>
            <Col>
              Subtotal
            </Col>
          </Row>
          <Row>
            <Col>
              <b>{formatAsCurrency(subtotal)}</b>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Offcanvas>
  );
};

export default Cart;
