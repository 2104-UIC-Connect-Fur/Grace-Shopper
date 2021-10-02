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
