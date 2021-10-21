import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { number } from 'prop-types';
import { store } from './State';
import {
  getItemById, addOrSubtractItem, getCart, addNewItemToCart, createCart,
} from '../api';
import Alert from 'react-bootstrap/Alert';

const AddToCartButton = ({ itemId, inventoryquantity }) => {
  const { state, dispatch } = useContext(store);
  const { userCart, isLoggedIn } = state;
  const loginPopover = (
    <Popover id="popover-basic">
      <Popover.Body>
        Please login or create an account to purchase this rare item!
      </Popover.Body>
    </Popover>
  );
  // console.log("user cart: ", userCart);
  const clickHandler = async () => {
    const { success, item } = await getItemById(itemId);
    const itemIsInStock = item.inventoryquantity > 0;
    if (userCart) {
      // this will be -1 if the item is not in the cart, or an array index
      // if it is already in the cart
      const existingItemIndex = userCart.items.findIndex(
        (cartItem) => cartItem.itemId === itemId,
      );
      const alreadyHasItemInCart = existingItemIndex > -1;
      const canAddMore = alreadyHasItemInCart
      && (userCart.items[existingItemIndex].quantity < item.inventoryquantity);

      // this first if branch is the case where the item is already in the cart.
      if (success && alreadyHasItemInCart && canAddMore) {
        console.log('updating item quantity...');
        await addOrSubtractItem(
          userCart.orderId, item.id, userCart.items[existingItemIndex].quantity + 1,
        );
      } else if (success && !alreadyHasItemInCart && itemIsInStock) {
        console.log('adding new item to cart...');
        // this else if branch is the case where the item is not in the cart already
        await addNewItemToCart(
          {
            orderId: userCart.orderId,
            itemId,
            quantity: 1,
          },
        );
      }
    } else if (!userCart && itemIsInStock) {
      console.log('creating cart and adding item...');
      // this else if branch is the case where the user does not yet have a cart. so let's make one!
      const { newCart } = await createCart();
      await addNewItemToCart(
        {
          orderId: newCart.id,
          itemId,
          quantity: 1,
        },
      );
    }
    const { success: cartFetchSuccess, cart } = await getCart();
    if (cartFetchSuccess) {
      dispatch({
        type: 'updateCart',
        value: cart,
      });
    }
  };

  if (inventoryquantity === 0) return (
    <Alert
    variant="light"
    >
      This item is out of stock. Please check back later!
    </Alert>
  )

  return (
    <>
    {
    isLoggedIn
    ? (
      <Button
        type="button"
        variant="outline-dark"
        onClick={clickHandler}
      >
        Add to Cart
      </Button>
    )
    :
    (
      <OverlayTrigger trigger="click" placement="bottom" overlay={loginPopover}>
        <Button
        type="button"
        variant="outline-dark"
      >
        Add to Cart
      </Button>
      </OverlayTrigger>
    )
  }
  </>
  )
};

AddToCartButton.propTypes = {
  itemId: number.isRequired,
  itemQuantity: number.isRequired,
};

export default AddToCartButton;
