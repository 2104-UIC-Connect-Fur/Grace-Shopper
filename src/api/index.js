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
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: queryObject,
    };
    const { data } = await axios.post('/api/items/search', config);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
