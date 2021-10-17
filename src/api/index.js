/* eslint-disable no-useless-catch */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export async function getMe() {
  try {
    const { data } = await axios.get('/api/users/me');
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 *
 * @param {*} updateObject
 * expected input is an object with these properties
 * orderId: the order id from the user's cart
 * itemId: the id of the item to be added
 * quantity: the number of items (in this case, 1)
 * @returns
 */
export const addNewItemToCart = async (updateObject) => {
  const body = updateObject;

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  const fetchResult = await fetch('/api/orders/items', config);
  const json = await fetchResult.json();
  return json;
};

export async function checkout(queryObject) {
  try {
    const { data } = await axios.post('/api/orders/checkout', queryObject);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const loginUser = async (username, password, rememberMe) => {
  const body = {
    username,
    password,
    rememberMe,
  };

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  const fetchResult = await fetch('/api/users/login', config);
  const json = await fetchResult.json();
  return json;
};

export const registerUser = async (
  username,
  password,
  firstname,
  lastname,
  email,
  phonenumber,
  zipcode,
  isAdmin,
) => {
  const body = {
    username,
    password,
    firstname,
    lastname,
    email,
    phonenumber,
    zipcode,
    isAdmin,
  };

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const fetchResult = await fetch('/api/users/register', config);
  const json = await fetchResult.json();
  return json;
};

export const logoutUser = async () => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const fetchResult = await fetch('/api/users/logout', config);
  const json = await fetchResult.json();
  return json;
};
export async function getAllItems() {
  try {
    const { data } = await axios.get('/api/items');
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllCategories() {
  try {
    const { data } = await axios.get('/api/items/categories');
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getItemsFromQuery(queryObject) {
  try {
    const { data } = await axios.post('/api/items/search', queryObject);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getItemById(id) {
  try {
    const { data } = await axios.get(`/api/items/byItemId/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCart() {
  try {
    const { data } = await axios.get('/api/users/cart');
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createCart() {
  try {
    const { data } = await axios.post('/api/users/cart');
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const addOrSubtractItem = async (orderId, itemId, quantity) => {
  const body = {
    orderId,
    itemId,
    quantity,
  };
  const config = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const fetchResult = await fetch('/api/orders/items', config);
  const json = await fetchResult.json();
  return json;
};

export const updateDbItem = async (updateObject) => {
  const body = updateObject;
  const config = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const fetchResult = await fetch('/api/items', config);
  const json = await fetchResult.json();
  return json;
};

export const removeItemFromOrder = async (orderId, itemId) => {
  const body = {
    orderId,
    itemId,
  };
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const fetchResult = await fetch('/api/orders/items', config);
  const json = await fetchResult.json();
  return json;
};

export async function verifyAdmin() {
  try {
    const { data } = await axios.get('/api/admin/isAdmin');
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsersData() {
  try {
    const fetchResult = await fetch('/api/admin/users');
    const json = await fetchResult.json();
    return json;
  } catch (error) {
    throw error;
  }
}
