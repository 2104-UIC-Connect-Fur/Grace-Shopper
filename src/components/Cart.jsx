import React, { useContext } from 'react';
import {
  Offcanvas, ListGroup, Button, Row, Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { store } from './State';
import { formatAsCurrency } from '../utils';
import deleteIcon from '../images/deleteIcon.svg';
import plus from '../images/plus.png';
import minus from '../images/minus.png';
import { addOrSubtractItem, removeItemFromOrder, getItemById } from '../api';

const Cart = ({ cartShow, setCartShow }) => {
  const { state, dispatch } = useContext(store);
  const { username, userCart } = state;

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
      const tempCart = { ...userCart };
      const itemIndex = tempCart.items.findIndex((item) => item.itemId === currItem.itemId);
      tempCart.items[itemIndex].quantity = quantity;
      updateCart(tempCart);
    }
  };

  const subtractHandler = async (currItem) => {
    if (currItem.quantity === 1) {
      await removeItemFromOrder(userCart.orderId, currItem.itemId);
      const tempCart = { ...userCart };
      const itemIndex = tempCart.items.findIndex((item) => item.itemId === currItem.itemId);
      tempCart.items.splice(itemIndex, 1);
      updateCart(tempCart);
    }

    if (currItem.quantity > 1) {
      // eslint-disable-next-line max-len
      const { orderItem: { quantity } } = await addOrSubtractItem(userCart.orderId, currItem.itemId, currItem.quantity - 1);
      const tempCart = { ...userCart };
      const itemIndex = tempCart.items.findIndex((item) => item.itemId === currItem.itemId);
      tempCart.items[itemIndex].quantity = quantity;
      updateCart(tempCart);
    }
  };

  const deleteHandler = async (currItem) => {
    await removeItemFromOrder(userCart.orderId, currItem.itemId);
    const tempCart = { ...userCart };
    const itemIndex = tempCart.items.findIndex((item) => item.itemId === currItem.itemId);
    tempCart.items.splice(itemIndex, 1);
    updateCart(tempCart);
  };

  return (
    <Offcanvas show={cartShow} onHide={() => setCartShow(false)} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{username ? `${username}'s cart` : 'Your cart'}</Offcanvas.Title>
      </Offcanvas.Header>
      <ListGroup variant="flush">
        {userCart.items.map((item) => (
          <ListGroup.Item>
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
                variant="primary"
                onClick={() => setCartShow(false)}
              >
                Checkout
              </Button>
            </Link>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Offcanvas>
  );
};

Cart.propTypes = {
  cartShow: PropTypes.bool.isRequired,
  setCartShow: PropTypes.func.isRequired,
};

export default Cart;
