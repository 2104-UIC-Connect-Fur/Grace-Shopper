import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createItemInDb } from "../api";
import { Link } from "react-router-dom";

const CreateItem = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, updateTitle] = useState("");
  const [description, updateDescription] = useState("");
  const [price, updatePrice] = useState("");
  const [active, setToActive] = useState(true);
  const [inventoryquantity, updateQuantity] = useState("");

  const createItem = async (e) => {
    e.preventDefault();
    const queryObject = {
      title,
      description,
      price,
      inventoryquantity,
      active,
    };
    const { success } = await createItemInDb(queryObject);
    if (success) setShow(false);
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={handleShow}
        style={{
          width: "10%",
          margin: "auto",
          background: "grey",
        }}
      >
        Create Item
      </Button>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title id="contained-modal-title-vcenter">
            Create an Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="itemTitle">
              <Form.Label>Item Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                onChange={(event) => updateTitle(event.target.value)}
              />
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                type="description"
                value={description}
                onChange={(event) => updateDescription(event.target.value)}
              />
              <Form.Label>Item Price</Form.Label>
              <Form.Control
                value={price}
                onChange={(event) => updatePrice(event.target.value)}
              />
              <Form.Label>Inventory Quantity </Form.Label>
              <Form.Control
                value={inventoryquantity}
                onChange={(event) => updateQuantity(event.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={createItem}>
              Create Item
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateItem;
