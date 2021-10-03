import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { string, shape } from 'prop-types';

const ListItem = ({
  item,
}) => {
  const { title, description } = item;
  return (
    <Col className="col-lg-3 col-md-4 col-sm-12">
      <Card className="border">
        <Card.Img variant="top" src="https://placedog.net/500/500" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <Button variant="primary">Add to Cart</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

ListItem.propTypes = {
  item: shape({
    title: string.isRequired,
    description: string.isRequired,
  }).isRequired,
};

export default ListItem;
