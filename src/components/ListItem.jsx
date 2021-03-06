import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { string, shape, arrayOf, number } from "prop-types";
import { formatAsCurrency } from "../utils";
import { verifyAdmin } from "../api";
import AddToCartButton from "./AddToCartButton";

const ListItem = ({ item }) => {
  const { title, description, price, images, id, inventoryquantity } = item;
  const mainImage = images[0].url;
  const [isAdmin, updateAdmin] = useState(false);

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
    <>
      <Col className="col-lg-3 col-md-4 col-sm-12 mb-2" sm={12} md={4}>
        <Card className="h-100">
          <Link to={`/items/${id}`}>
            <Card.Img variant="top" src={mainImage} />
          </Link>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>{formatAsCurrency(price)}</Card.Text>
            <AddToCartButton
            itemId={id}
            inventoryquantity={inventoryquantity}
            />
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

ListItem.propTypes = {
  item: shape({
    id: number.isRequired,
    title: string.isRequired,
    description: string.isRequired,
    inventoryquantity: number.isRequired,
    images: arrayOf(
      shape({
        url: string.isRequired,
        description: string.isRequired,
        alttext: string.isRequired,
      })
    ),
  }).isRequired,
};

export default ListItem;
