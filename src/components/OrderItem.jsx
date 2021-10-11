/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import {
  string, shape, arrayOf, number,
} from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { store } from './State';
import { getCart } from '../api';
import { formatAsCurrency } from '../utils/formatting';

const OrderItem = ({ item }) => {
  const { title, quantity, currentprice } = item;
  return (
    <Row
      className="d-flex flex-row"
    >
      <div>
        <strong>{title}</strong>
      </div>
      <div>
        Quantity:
        {' '}
        {quantity}
      </div>
      <div>
        Price:
        {' '}
        {formatAsCurrency(currentprice)}
      </div>
    </Row>
  );
};

OrderItem.propTypes = {
  item: shape({
    itemId: number.isRequired,
    quantity: number.isRequired,
    currentprice: number.isRequired,
    title: string.isRequired,
  }).isRequired,
};

export default OrderItem;
