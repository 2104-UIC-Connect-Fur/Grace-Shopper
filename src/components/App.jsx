import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Axios from "axios";
import Items from "./Items";
import Cart from "./Cart";
import Order from "./Order";
import AdminPanel from "./AdminPanel";
import { store } from "./State";
import "./App.css";
import Navigation from "./Navigation";
import SingleItem from "./SingleItem";
import { getCart } from "../api";

const App = () => {
  const { state, dispatch } = useContext(store);
  const { isLoggedIn, username, userCart } = state;
  const [badgeNumber, setBadgeNumber] = useState(null);
  const [cartShow, setCartShow] = useState(false);

  useEffect(() => {
    const checkForLogin = async () => {
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const {
        data: { success, username },
      } = await Axios.get("/api/users/me", config);
      if (success) {
        dispatch({
          type: "updateIsLoggedIn",
          value: true,
        });
        dispatch({
          type: "setUsername",
          value: username,
        });
        const { success: cartSuccess, cart } = await getCart();
        if (cartSuccess) {
          dispatch({
            type: "updateCart",
            value: cart,
          });
          let total = 0;
          cart.items.forEach((item) => {
            total += item.quantity;
          });
          setBadgeNumber(total);
        }
      }
    };
    checkForLogin();
  }, []);

  useEffect(() => {
    const checkForCartChanges = async () => {
      const { success: cartSuccess, cart } = await getCart();
      if (cartSuccess) {
        dispatch({
          type: "updateCart",
          value: cart,
        });
        let total = 0;
        cart.items.forEach((item) => {
          total += item.quantity;
        });
        setBadgeNumber(total);
      } else {
        dispatch({
          type: "updateCart",
          value: null,
        });
        setBadgeNumber(null);
      }
    };
    checkForCartChanges();
  }, [username]);

  useEffect(() => {
    let total = 0;
    if (userCart && userCart.items.length) {
      userCart.items.forEach((item) => {
        total += item.quantity;
      });
    }
    setBadgeNumber(total);
  }, [userCart]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation
          itemCount={badgeNumber}
          cartShow={cartShow}
          setCartShow={setCartShow}
        />
        <Cart cartShow={cartShow} setCartShow={setCartShow} />
        <Switch>
          <Route exact path="/items" component={Items} />
          <Route exact path="/items/:itemId" component={SingleItem} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/order" component={Order} />
          <Route exact path="/admin" component={AdminPanel} />
          <Route path="/">
            <header className="App-header">
              <h1>RARE SHIT</h1>
            </header>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
