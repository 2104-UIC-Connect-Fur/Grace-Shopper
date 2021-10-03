import React, { useContext, useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Axios from 'axios';
import Items from './Items';
import { store } from './State';
import './App.css';
import Navigation from './Navigation';

const App = () => {
  const { state, dispatch } = useContext(store);
  const { isLoggedIn, username } = state;
  useEffect(() => {
    const checkForLogin = async () => {
      const config = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data: { success, username } } = await Axios.get('/api/users/me', config);
      if (success) {
        dispatch({
          type: 'updateIsLoggedIn',
          value: true,
        });
        dispatch({
          type: 'setUsername',
          value: username,
        });
      }
    };
    checkForLogin();
  }, []);

  // const loginClickHandler = async () => {
  //   const body = {
  //     username: 'catcatsby',
  //     password: 'password',
  //   };
  //   const config = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(body),
  //   };

  //   const fetchResult = await fetch('/api/users/login', config);
  //   const { success, loggedInUser } = await fetchResult.json();
  //   if (success) {
  //     dispatch({
  //       type: 'updateIsLoggedIn',
  //       value: true,
  //     });
  //     dispatch({
  //       type: 'setUsername',
  //       value: loggedInUser,
  //     });
  //   }
  // };

  // const logoutClickHandler = async () => {
  //   const config = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   const fetchResult = await fetch('/api/users/logout', config);
  //   const json = await fetchResult.json();
  //   dispatch({
  //     type: 'updateIsLoggedIn',
  //     value: false,
  //   });
  //   dispatch({
  //     type: 'deleteUsername',
  //     value: null,
  //   });
  // };

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/items" component={Items} />
          <Route path="/">
            <header className="App-header">
              <h1>RARE SHIT</h1>
            </header>
            {/* <div>
              {
                isLoggedIn
                && (
                  <p>
                    Logged in as
                    {' '}
                    {username}
                  </p>
                )
              }
            </div> */}
            {/* <div>
              <button onClick={loginClickHandler} type="button">Log in catcatsby</button>
            </div>
            <div>
              <button onClick={logoutClickHandler} type="button">Log out</button>
            </div> */}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
