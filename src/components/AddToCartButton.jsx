import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { number } from 'prop-types';
import { store } from './State';
import {
  getItemById, addOrSubtractItem, getCart, updateDbItem, addNewItemToCart,
} from '../api';

const AddToCartButton = ({ itemId }) => {
  const { state, dispatch } = useContext(store);
  const { userCart } = state;

  const clickHandler = async () => {
    if (userCart) {
      const { success, item } = await getItemById(itemId);
      // this will be -1 if the item is not in the cart, or an array index
      // if it is already in the cart
      const existingItemIndex = userCart.items.findIndex(
        (cartItem) => cartItem.itemId === itemId,
      );

      // this first if branch is the case where the item is already in the cart.
      if (success && item.inventoryquantity > 0 && (existingItemIndex > -1)) {
        await addOrSubtractItem(
          userCart.orderId, item.id, userCart.items[existingItemIndex].quantity + 1,
        );
        await updateDbItem({
          id: itemId,
          inventoryquantity: item.inventoryquantity - 1,
        });
      } else if (success && item.inventoryquantity > 0 && (existingItemIndex === -1)) {
      // this else if branch is the case where the item is not in the cart already
        await addNewItemToCart(
          {
            orderId: userCart.orderId,
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
    }

    // if no cart
    // create an order
    // add to ordersitems table
    // call getcart to set global cart value
  };

  return (
    <Button
      type="button"
      onClick={clickHandler}
    >
      Add to Cart
    </Button>
  );
};

AddToCartButton.propTypes = {
  itemId: number.isRequired,
};

export default AddToCartButton;
