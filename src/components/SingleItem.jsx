import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom';
import { getItemById } from '../api';
import { formatAsCurrency } from '../utils';

const SingleItem = () => {
  const { itemId } = useParams();
  const [errorState, setErrorState] = useState(false);
  const [itemToDisplay, setItemToDisplay] = useState(null);
  const showGallery = itemToDisplay && itemToDisplay.images.length > 1;
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
  }, []);
  if (errorState) return (<h1>Problem loading item. Please try again!</h1>);
  if (!itemToDisplay) return (<h1>Loading...</h1>);

  if (showGallery) {
    return (
      <Container>
        <Row>
          <h1>{itemToDisplay.title}</h1>
        </Row>
        <Row>
          <h2>{formatAsCurrency(itemToDisplay.price)}</h2>
        </Row>
        <Row className="justify-content-center">
          <Carousel
            className="d-block w-75"
          >
            {
            itemToDisplay.images.map((image) => (
              <Carousel.Item
                key={image.id}
              >
                <img
                  className="d-block w-100"
                  src={image.url}
                  alt={image.alttext}
                />
              </Carousel.Item>
            ))
          }
          </Carousel>
        </Row>
        <Row>
          <h3>{itemToDisplay.description}</h3>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <h1>Not the carousel</h1>
        <h1>{itemToDisplay.title}</h1>
      </Row>
      <Row>
        <h2>{formatAsCurrency(itemToDisplay.price)}</h2>
      </Row>
      <Row className="justify-content-center">
        <Image src={itemToDisplay.images[0].url} className="d-block w-75" />
      </Row>
    </Container>
  );
};

export default SingleItem;
