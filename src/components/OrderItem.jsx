/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import {
  string, shape, arrayOf, number,
} from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { stringifyUrl } from 'query-string';
import { store } from './State';
import { getCart } from '../api';
import { formatAsCurrency } from '../utils/formatting';

const OrderItem = ({ item }) => {
  const {
    title, quantity, currentprice, images,
  } = item;
  const { url, alttext } = images[0];
  return (
    <Row
      className="d-flex flex-row"
    >
      <div>
        <img
          src={url}
          alt={alttext}
          style={{
            boxShadow: '0px 10px 10px grey',
            marginBottom: '1vh',
            width: '15vw',
          }}
        />
      </div>
      <div>
        <strong>{title}</strong>
      </div>
      <div>
        <strong>
          Quantity:
        </strong>
        {' '}
        {quantity}
      </div>
      <div>
        <strong>
          Price:
        </strong>
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
    images: arrayOf(shape({
      url: string.isRequired,
      description: string.isRequired,
      alttext: string.isRequired,
    })),
  }).isRequired,
};

export default OrderItem;
