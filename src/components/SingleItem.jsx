import React, { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import {
  getItemById,
  verifyAdmin,
  updateItemInDB,
  deleteItemInDb,
} from "../api";
import { formatAsCurrency } from "../utils";
import Button from "react-bootstrap/Button";
import { store } from "./State";

const SingleItem = () => {
  const { itemId } = useParams();
  const { state } = useContext(store);
  const { isLoggedIn } = state;
  const [isAdmin, updateAdmin] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [itemToDisplay, setItemToDisplay] = useState({});
  const [title, updateTitle] = useState(itemToDisplay.title);
  const [description, updateDescription] = useState(itemToDisplay.description);
  const [price, updatePrice] = useState(itemToDisplay.price);
  const [active, setToActive] = useState(true);
  const [inventoryquantity, updateQuantity] = useState(itemToDisplay.quantity);
  const [showEditControls, setShowEditControls] = useState(false);

  const showGalleryControls =
    itemToDisplay && itemToDisplay.images && itemToDisplay.images.length > 1;

  useEffect(() => {
    const checkforAdmin = async () => {
      const { success } = await verifyAdmin();
      if (success) {
        updateAdmin(true);
      } else updateAdmin(false);
    };
    checkforAdmin();
  }, [isAdmin, isLoggedIn]);

  useEffect(() => {
    const getItem = async (id) => {
      const { item, success } = await getItemById(id);
      if (success) {
        setItemToDisplay(item);
      } else {
        setErrorState(true);
      }
    };
    getItem(itemId);
  }, [itemId]);

  const updateItem = async () => {
    const queryObject = {
      id: Number(itemId),
      title,
      description,
      price: Number(price),
      inventoryquantity: Number(inventoryquantity),
    };
    const response = await updateItemInDB(queryObject);
    console.log(response);
  };

  const updateItemToInactive = async () => {
    const queryObject = {
      id: itemId,
      active: false,
    };
    const response = await deleteItemInDb(queryObject);
    console.log(response);
  };

  const showLoading = !itemToDisplay.hasOwnProperty('title');

  if (showLoading) return <h1>Loading...</h1>;
  if (errorState) return <h1>Problem loading item. Please try again!</h1>;

  return (
    <Container
    className="main-content"
    >
      {isAdmin && (
        <Button
          className="mt-2 pb-2"
          onClick={() => {
            setShowEditControls(!showEditControls);
          }}
          variant="outline-danger"
          style={{
            width: "10%",
            margin: "auto",
          }}
        >
          Edit Item
        </Button>
      )}
      {showEditControls ? (
        <>
          <FloatingLabel controlId="string" label="Item name" className="mb-3">
            <Form.Control
              type="string"
              value={title}
              onChange={(event) => updateTitle(event.target.value)}
              placeholder={itemToDisplay.title}
            />
          </FloatingLabel>
        </>
      ) : (
        <Row>
          <h1>{itemToDisplay.title}</h1>
        </Row>
      )}
      {showEditControls ? (
        <FloatingLabel controlId="string" label="Item Price">
          <Form.Control
            type="number"
            size="sm"
            value={price}
            onChange={(event) => updatePrice(event.target.value)}
            placeholder={formatAsCurrency(itemToDisplay.price)}
          />
        </FloatingLabel>
      ) : (
        <Row>
          <h2>{formatAsCurrency(itemToDisplay.price)}</h2>
        </Row>
      )}
      <Row className="justify-content-center">
        <Carousel
          className="d-block col-sm-4 col-md-6 col-lg-8"
          controls={showGalleryControls}
        >
          {itemToDisplay.images &&
            itemToDisplay.images.map((image) => (
              <Carousel.Item key={image.id}>
                <img
                  className="d-block w-100"
                  src={image.url}
                  alt={image.alttext}
                />
                <Carousel.Caption
                  style={{
                    backgroundColor: "rgba(188,193,191,0.65)",
                    color: "white",
                    fontSize: "1.5vw",
                    fontWeight: "bold",
                  }}
                >
                  <p>{image.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
        </Carousel>
      </Row>
      {showEditControls ? (
        <FloatingLabel controlId="string" label="Item Descpription">
          <Form.Control
            type="string"
            placeholder={itemToDisplay.description}
            value={description}
            onChange={(event) => updateDescription(event.target.value)}
          />
        </FloatingLabel>
      ) : (
        <>
          <Row className="mt-2 w-25 mx-auto">
          <AddToCartButton
            itemId={Number(itemId)}
            inventoryquantity={itemToDisplay.inventoryquantity}
            />
          </Row>

          <Row className="mt-2 pb-5">
            <h4>{itemToDisplay.description}</h4>
          </Row>
        </>
      )}
      {showEditControls ? (
        <FloatingLabel controlId="string" label="Item Quantity">
          <Form.Control
            type="number"
            placeholder={itemToDisplay.quantity}
            value={inventoryquantity}
            onChange={(event) => updateQuantity(event.target.value)}
          />
        </FloatingLabel>
      ) : null}
      <Link to={`/`}>
        {showEditControls ? (
          <Button
            variant="outline-success"
            onClick={updateItem}
          >
            Submit
          </Button>
        ) : null}
        {showEditControls ? (
          <Button
            onClick={updateItemToInactive}
            variant="danger"
          >
            Delete
          </Button>
        ) : null}
      </Link>
    </Container>
  );
};

export default SingleItem;
