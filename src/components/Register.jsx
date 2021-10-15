import React, { useContext, useState } from 'react';
import {
  Modal, Button, Form, Container, Nav,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { store } from './State';
import { registerUser } from '../api';

const Register = ({
  setLoginModalShow, regModalShow, setRegModalShow,
}) => {
  const { dispatch } = useContext(store);

  const [currUsername, setCurrUsername] = useState();
  const [currPassword, setCurrPassword] = useState();
  const [currFirstName, setCurrFirstName] = useState();
  const [currLastName, setCurrLastName] = useState();
  const [currEmail, setCurrEmail] = useState();
  const [currPhoneNumber, setCurrPhoneNumber] = useState();
  const [currZipCode, setCurrZipCode] = useState();
  // eslint-disable-next-line no-unused-vars
  const [currIsAdmin, setCurrIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const registerResult = await registerUser(
      currUsername,
      currPassword,
      currFirstName,
      currLastName,
      currEmail,
      currPhoneNumber,
      currZipCode,
      currIsAdmin,
    );

    if (registerResult.success) {
      dispatch({
        type: 'updateIsLoggedIn',
        value: true,
      });
      dispatch({
        type: 'setUsername',
        value: registerResult.loggedInUser,
      });
      setRegModalShow(false);
    }
    if (registerResult.message) {
      setErrorMessage(registerResult.message);
    }
  };

  return (
    <Modal
      id="registerModal"
      show={regModalShow}
      onHide={() => setRegModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <h4>Sign up here!</h4>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) => {
                e.preventDefault();
                setCurrUsername(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                e.preventDefault();
                setCurrPassword(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Control
              type="text"
              placeholder="First Name"
              onChange={(e) => {
                e.preventDefault();
                setCurrFirstName(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Control
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                e.preventDefault();
                setCurrLastName(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => {
                e.preventDefault();
                setCurrEmail(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Control
              type="tel"
              placeholder="Phone"
              onChange={(e) => {
                e.preventDefault();
                setCurrPhoneNumber(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicZipCode">
            <Form.Control
              type="number"
              placeholder="Zip Code"
              onChange={(e) => {
                e.preventDefault();
                setCurrZipCode(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Button className="mb-3" variant="primary" type="submit">
            Submit
          </Button>
          {errorMessage && <p className="mt-3" style={{ color: 'red' }}>{errorMessage}</p>}
        </Form>
        <p>Already a member?</p>
        <Container onClick={() => {
          setRegModalShow(false);
          setLoginModalShow(true);
        }}
        >
          <Nav.Link>Sign in</Nav.Link>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setRegModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

Register.propTypes = {
  setLoginModalShow: PropTypes.func.isRequired,
  regModalShow: PropTypes.bool.isRequired,
  setRegModalShow: PropTypes.func.isRequired,
};

export default Register;
