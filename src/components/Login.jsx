import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { store } from './State';
import { loginUser } from '../api';

const LoginModal = ({ show, onHide }) => {
  const { dispatch } = useContext(store);

  const [password, setPassword] = useState();
  const [currUsername, setCurrUsername] = useState();
  const [rememberMe, setRememberMe] = useState(false);

  const checkHandler = () => {
    if (rememberMe) {
      setRememberMe(false);
    } else {
      setRememberMe(true);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { success, loggedInUser } = await loginUser(currUsername, password, rememberMe);

    if (success) {
      dispatch({
        type: 'updateIsLoggedIn',
        value: true,
      });
      dispatch({
        type: 'setUsername',
        value: loggedInUser,
      });
      onHide();
    }
  };

  return (
    <Modal
      id="loginModal"
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Welcome back!
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <h4>Welcome back!</h4>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              onChange={(e) => {
                e.preventDefault();
                setCurrUsername(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" onChange={checkHandler} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const Login = () => {
  const { state } = useContext(store);
  const { isLoggedIn, username } = state;
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Login
      </Button>
      <h2>{isLoggedIn && `Salutations, ${username}`}</h2>
      <LoginModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default Login;
