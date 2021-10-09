import React, { useContext, useState } from 'react';
import {
  Navbar, Container, Nav, NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { store } from './State';
import Login from './Login';
import Cart from '../images/Cart.png';
import { logoutUser } from '../api';

const Navigation = () => {
  const { state, dispatch } = useContext(store);
  const { isLoggedIn, username } = state;
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [regModalShow, setRegModalShow] = useState(false);

  const signOutClickHandler = async () => {
    const { success } = await logoutUser();
    if (success) {
      dispatch({
        type: 'updateIsLoggedIn',
        value: false,
      });
      dispatch({
        type: 'deleteUsername',
        value: null,
      });
    }
  };

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
                <NavDropdown.Item onClick={signOutClickHandler}>Sign Out</NavDropdown.Item>
                <NavDropdown.Item href="/">Another action</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Container onClick={() => setLoginModalShow(true)}>
                <Nav.Link>
                  Login
                </Nav.Link>
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
        <Navbar.Brand href="/">
          <img
            src={Cart}
            width="30"
            height="auto"
            className="d-inline-block align-top"
            alt="shopping cart"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Navigation;
