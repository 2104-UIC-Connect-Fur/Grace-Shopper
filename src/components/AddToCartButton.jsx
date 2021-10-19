import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { number } from 'prop-types';
import { store } from './State';
import {
  getItemById, addOrSubtractItem, getCart, addNewItemToCart, createCart,
} from '../api';

const AddToCartButton = ({ itemId }) => {
  const { state, dispatch } = useContext(store);
  const { userCart } = state;
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

  return (
    <Button
      type="button"
      onClick={() => clickHandler()}
    >
      Add to Cart
    </Button>
  );
};

AddToCartButton.propTypes = {
  itemId: number.isRequired,
};

export default AddToCartButton;
