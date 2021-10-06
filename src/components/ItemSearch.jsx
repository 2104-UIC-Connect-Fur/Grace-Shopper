import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { formatAsCurrency } from '../utils';
import { getAllCategories } from '../../db/items';

const ItemSearch = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [priceLow, setPriceLow] = useState(0);
  const [priceHigh, setPriceHigh] = useState(1000000);
  const [userSearchTerm, setUserSearchTerm] = useState(null);
  const [categoryIds, setCategoryIds] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await getAllCategories();
      setCategories(fetchedCategories);
    };
    getCategories();
  });

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Refine Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="Title">
              <Form.Label column sm={2}>
                Search title or description
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="type your search here"
                  onChange={(event) => {
                    event.preventDefault();
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="sm-12 lg-12" controlId="priceLow">
              <Form.Label column sm={12} lg={12}>
                Low price threshold (
                {formatAsCurrency(priceLow)}
                )
              </Form.Label>
              <Form.Control
                sm={12}
                lg={12}
                type="range"
                value={priceLow}
                min="0"
                max="1000000"
                step={1000}
                onChange={(e) => {
                  e.preventDefault();
                  setPriceLow(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Row} className="sm-12 lg-12" controlId="priceHigh">
              <Form.Label column sm={12} lg={12}>
                High price threshold (
                {formatAsCurrency(priceHigh)}
                )
              </Form.Label>
              <Form.Control
                sm={12}
                lg={12}
                type="range"
                value={priceHigh}
                min="0"
                max="1000000"
                step={1000}
                onChange={(e) => {
                  e.preventDefault();
                  setPriceHigh(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ItemSearch;
