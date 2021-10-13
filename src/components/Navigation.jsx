import React, { useContext, useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { store } from "./State";
import Login from "./Login";
import CartPic from "../images/CartPic.png";
import { logoutUser, verifyAdmin } from "../api";

const Navigation = ({ itemCount, cartShow, setCartShow }) => {
  const { state, dispatch } = useContext(store);
  const { isLoggedIn, username, userCart } = state;
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [regModalShow, setRegModalShow] = useState(false);
  const [isAdmin, updateAdmin] = useState(false);

  const signOutClickHandler = async () => {
    const { success } = await logoutUser();
    if (success) {
      dispatch({
        type: "updateIsLoggedIn",
        value: false,
      });
      dispatch({
        type: "deleteUsername",
        value: null,
      });
    }
  };

  const cartClickHandler = () => {
    if (!cartShow) {
      setCartShow(true);
    } else {
      setCartShow(false);
    }
  };

  useEffect(() => {
    const checkforAdmin = async () => {
      const { success, message } = await verifyAdmin();
      if (success && message) {
        console.log({ message });
        updateAdmin(true);
      }
    };
    checkforAdmin();
  }, []);

  return (
    <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/items">
              <Nav.Link>Items</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/">
              <Nav.Link>Categories</Nav.Link>
            </LinkContainer>
            {isLoggedIn ? (
              <NavDropdown title={`Hi, ${username}`} id="basic-nav-dropdown">
                <NavDropdown.Item href="/">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/">My Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={signOutClickHandler}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Container onClick={() => setLoginModalShow(true)}>
                <Nav.Link>Login</Nav.Link>
                <Login
                  loginModalShow={loginModalShow}
                  setLoginModalShow={setLoginModalShow}
                  regModalShow={regModalShow}
                  setRegModalShow={setRegModalShow}
                />
              </Container>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Container className="justify-content-end">
        <Navbar.Brand onClick={cartClickHandler} style={{ cursor: "pointer" }}>
          <img
            src={CartPic}
            width="30"
            height="auto"
            className="d-inline-block align-top"
            alt="shopping cart"
          />
          {itemCount && (
            <Badge pill bg="secondary" style={{ fontSize: "xx-small" }}>
              {itemCount}
            </Badge>
          )}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Navigation;
