/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import {
  Modal, Button, Form, Alert,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { store } from './State';
import { loginUser } from '../api';
import Register from './Register';

const Login = ({
  loginModalShow, setLoginModalShow, regModalShow, setRegModalShow,
}) => {
  const { dispatch } = useContext(store);

  const [password, setPassword] = useState();
  const [currUsername, setCurrUsername] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [alertShow, setAlertShow] = useState(false);

  const checkHandler = () => {
    if (rememberMe) {
      setRememberMe(false);
    } else {
      setRememberMe(true);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // const { success, loggedInUser } = await loginUser(currUsername, password, rememberMe);
    const loginResult = await loginUser(currUsername, password, rememberMe);

    if (loginResult.success) {
      dispatch({
        type: 'updateIsLoggedIn',
        value: true,
      });
      dispatch({
        type: 'setUsername',
        value: loginResult.loggedInUser,
      });
      setLoginModalShow(false);
    } else {
      setErrorMessage(loginResult.message);
      setAlertShow(true);
    }
  };

  return (
    <Modal
      id="loginModal"
      show={loginModalShow}
      onHide={() => setLoginModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={(e) => e.stopPropagation()} />
      <Modal.Body>
        <h4>Welcome back!</h4>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Control
              type="text"
              placeholder="Username"
              required
              onChange={(e) => {
                e.preventDefault();
                setCurrUsername(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
            />
            {(errorMessage && alertShow) && (
            <Alert className="mt-3" variant="danger" onClose={() => setAlertShow(false)} dismissible>
              {errorMessage}
            </Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" onChange={checkHandler} />
          </Form.Group>
          <Button className="mb-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p>New to Rare Stuff?</p>
        <input
          type="text"
          onClick={() => {
            setLoginModalShow(false);
            setRegModalShow(true);
          }}
          readOnly
          value="Join us!"
          style={{ cursor: 'pointer', color: '#0d6efd' }}
        />
        <Register
          setLoginModalShow={setLoginModalShow}
          regModalShow={regModalShow}
          setRegModalShow={setRegModalShow}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={(e) => {
          e.stopPropagation();
          setLoginModalShow(false);
        }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

Login.propTypes = {
  loginModalShow: PropTypes.bool.isRequired,
  setLoginModalShow: PropTypes.func.isRequired,
  regModalShow: PropTypes.bool.isRequired,
  setRegModalShow: PropTypes.func.isRequired,
};

export default Login;
