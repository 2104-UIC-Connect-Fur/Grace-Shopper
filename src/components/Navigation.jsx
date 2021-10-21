/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Badge,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PropTypes from "prop-types";
import { store } from "./State";
import Login from "./Login";
import ItemSearch from "./ItemSearch";
import ItemShuffle from "./ItemShuffle";
import CartPic from "../images/CartPic.png";
import { logoutUser, verifyAdmin, getAllCategories } from "../api";

const Navigation = ({ itemCount, cartShow, setCartShow }) => {
  const { state, dispatch } = useContext(store);
  const { isLoggedIn, username, userCart } = state;
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [regModalShow, setRegModalShow] = useState(false);
  const [isAdmin, updateAdmin] = useState(false);
  const { search } = useLocation();
  const [query, setQuery] = useState(search);
  const [allCategories, setAllCategories] = useState([]);
  const history = useHistory();

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

  const updateQuery = (newQueryObject) => {
    dispatch({
      type: "updateSearchQuery",
      value: newQueryObject,
    });
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
      const { success } = await verifyAdmin();
      if (success) {
        updateAdmin(true);
      } else {
        updateAdmin(false);
      }
    };
    checkforAdmin();
  }, [isLoggedIn, isAdmin]);

  useEffect(() => {
    const buildCategories = async () => {
      const { categories } = await getAllCategories();
      setAllCategories(categories);
    };
    buildCategories();
  }, []);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>Your cart is currently empty.</Popover.Body>
    </Popover>
  );

  const homeHandler = () => {
    dispatch({
      type: 'updateSearchQuery',
      value: {},
    });
  };

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg="light"
      variant="light"
      className="sticky-top nav-shadow"
    >
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer 
            className="mr-2"
            to="/"
            >
              <Nav.Link
              className="Nav-Brand"
              onClick={homeHandler}
              >Rare Stuff</Nav.Link>
            </LinkContainer>
            <NavDropdown
            title="Categories"
            className="mx-auto mt-3"
            >
              {allCategories.length > 0 &&
                allCategories.map((category) => (
                    <LinkContainer to={`/?categoryIds=${category.id}`}>
                      <NavDropdown.Item onClick={() => {
                        updateQuery({
                          categoryIds: [
                            category.id,
                          ]
                        })
                      }}>
                      {category.name}
                      </NavDropdown.Item>
                      </LinkContainer>
                ))}
            </NavDropdown>
            <ItemSearch setQuery={setQuery} setQueryObject={updateQuery} />
            <ItemShuffle />
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Container className="justify-content-end">
        {isLoggedIn ? (
          <NavDropdown title={`Hi, ${username}`} id="basic-nav-dropdown">
            {/* <NavDropdown.Item href="/">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/">My Orders</NavDropdown.Item> */}
            {isAdmin && (
              <LinkContainer to="/admin">
                <NavDropdown.Item>Admin</NavDropdown.Item>
              </LinkContainer>
            )}
            {isAdmin && (<NavDropdown.Divider />)}
            <NavDropdown.Item onClick={signOutClickHandler}>
              Sign Out
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Nav.Item
            className="me-3"
            style={{ cursor: "pointer" }}
            onClick={() => setLoginModalShow(true)}
          >
            Login
            <Login
              loginModalShow={loginModalShow}
              setLoginModalShow={setLoginModalShow}
              regModalShow={regModalShow}
              setRegModalShow={setRegModalShow}
            />
          </Nav.Item>
        )}
        {userCart && userCart.items.length ? (
          <Navbar.Brand
            onClick={cartClickHandler}
            style={{ cursor: "pointer" }}
          >
            <img
              src={CartPic}
              width="30"
              height="auto"
              className="d-inline-block align-top"
              alt="shopping cart"
            />
            {itemCount > 0 && (
              <Badge pill bg="secondary" style={{ fontSize: "xx-small" }}>
                {itemCount}
              </Badge>
            )}
          </Navbar.Brand>
        ) : (
          <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
            <Navbar.Brand style={{ cursor: "pointer" }}>
              <img
                src={CartPic}
                width="30"
                height="auto"
                className="d-inline-block align-top"
                alt="shopping cart"
              />
              {itemCount > 0 && (
                <Badge pill bg="secondary" style={{ fontSize: "xx-small" }}>
                  {itemCount}
                </Badge>
              )}
            </Navbar.Brand>
          </OverlayTrigger>
        )}
      </Container>
    </Navbar>
  );
};

Navigation.propTypes = {
  itemCount: PropTypes.number,
  cartShow: PropTypes.bool.isRequired,
  setCartShow: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  itemCount: 0,
};

export default Navigation;
