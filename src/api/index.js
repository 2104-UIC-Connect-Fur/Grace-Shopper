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
