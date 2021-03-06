import React, { useContext, useState } from 'react';
import {
  Offcanvas, ListGroup, Button, Row, Col, Container, Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { store } from './State';
import { formatAsCurrency } from '../utils';
import deleteIcon from '../images/deleteIcon.svg';
import plus from '../images/plus.png';
import minus from '../images/minus.png';
import {
  addOrSubtractItem, removeItemFromOrder, getItemById, getCart,
} from '../api';

const Cart = ({ cartShow, setCartShow }) => {
  const { state, dispatch } = useContext(store);
  const { username, userCart } = state;
  const [alertShow, setAlertShow] = useState(false);

  if (!userCart) {
    return '';
  }
  const subtotalArr = userCart.items.map((item) => item.currentprice * item.quantity);
  const subtotal = subtotalArr.reduce((a, b) => a + b, 0);

  const updateCart = (cartObject) => {
    dispatch({
      type: 'updateCart',
      value: cartObject,
    });
  };

  const addHandler = async (currItem) => {
    const { item: { inventoryquantity } } = await getItemById(currItem.itemId);
    if (currItem.quantity < inventoryquantity) {
      // eslint-disable-next-line max-len
      const { orderItem: { quantity } } = await addOrSubtractItem(userCart.orderId, currItem.itemId, currItem.quantity + 1);
      const { cart: tempCart } = await getCart();
      const itemIndex = tempCart.items.findIndex((item) => item.itemId === currItem.itemId);
      tempCart.items[itemIndex].quantity = quantity;
      updateCart(tempCart);
    }
    if (currItem.quantity === inventoryquantity) {
      setAlertShow(true);
    }
  };

  const subtractHandler = async (currItem) => {
    if (currItem.quantity === 1) {
      await removeItemFromOrder(userCart.orderId, currItem.itemId);
      const { cart: tempCart } = await getCart();
      updateCart(tempCart);
    }

    if (currItem.quantity > 1) {
      // eslint-disable-next-line max-len
      const { orderItem: { quantity } } = await addOrSubtractItem(userCart.orderId, currItem.itemId, currItem.quantity - 1);
      const { cart: tempCart } = await getCart();
      const itemIndex = tempCart.items.findIndex((item) => item.itemId === currItem.itemId);
      tempCart.items[itemIndex].quantity = quantity;
      updateCart(tempCart);
    }
  };

  const deleteHandler = async (currItem) => {
    await removeItemFromOrder(userCart.orderId, currItem.itemId);
    const { cart: tempCart } = await getCart();
    updateCart(tempCart);
  };

  return (
    <Offcanvas backdrop={true} show={cartShow} onHide={() => setCartShow(false)} placement="end" style={{ overflow: 'auto' }}>
      <Container>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{username ? `${username}'s cart` : 'Your cart'}</Offcanvas.Title>
        </Offcanvas.Header>
        <ListGroup variant="flush">
          {userCart.items.map((item) => (
            <ListGroup.Item key={item.itemId}>
              <Col>
                <img
                  src={item.images[0].url}
                  width="auto"
                  height="60px"
                  alt="current product"
                />
              </Col>
              <Row>
                <Col>
                  {item.title}
                </Col>
                <Col xs={2}>
                  <input
                    type="image"
                    alt="delete item from cart"
                    src={deleteIcon}
                    height="12"
                    width="auto"
                    onClick={() => { deleteHandler(item); }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <p><b>{formatAsCurrency(item.currentprice)}</b></p>
                </Col>
                <Col xs={3}>
                  <input
                    type="image"
                    onClick={() => { subtractHandler(item); }}
                    src={minus}
                    width="auto"
                    height="16"
                    className="pt-1"
                    alt="decrement item count"
                  />
                  {` ${item.quantity} `}
                  <input
                    type="image"
                    onClick={() => { addHandler(item); }}
                    src={plus}
                    width="auto"
                    height="16"
                    className="pt-1"
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
            <Row
              className="mt-3 justify-content-end"
            >
              <Link
                to="/order"
              >
                <Button
                  type="button"
                  variant="outline-primary"
                  onClick={() => setCartShow(false)}
                >
                  Checkout
                </Button>
              </Link>
            </Row>
            {alertShow && (
            <Alert className="mt-3" variant="danger" onClose={() => setAlertShow(false)} dismissible>
              You have already added the maximum number of this product to your cart.
            </Alert>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </Offcanvas>
  );
};

Cart.propTypes = {
  cartShow: PropTypes.bool.isRequired,
  setCartShow: PropTypes.func.isRequired,
};

export default Cart;
