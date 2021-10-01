import React, { useState, useEffect } from 'react';

import {
  getSomething,
} from '../api';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  });

  const loginClickHandler = async () => {
    const body = {
      username: 'catcatsby',
      password: 'password',
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
    console.log(json);
  };

  const logoutClickHandler = async () => {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const fetchResult = await fetch('/api/users/logout', config);
    const json = await fetchResult.json();
    console.log(json);
  };

  return (
    <div className="App">
      <h1>Hello, Michael!</h1>
      <h2>{ message }</h2>
      <button onClick={loginClickHandler} type="button">Log in catcatsby</button>
      <button onClick={logoutClickHandler} type="button">Log out</button>
    </div>
  );
};

export default App;
