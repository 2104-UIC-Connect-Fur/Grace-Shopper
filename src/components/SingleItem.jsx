import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import { getItemById } from '../api';
import { formatAsCurrency } from '../utils';

const SingleItem = () => {
  const { itemId } = useParams();
  const [errorState, setErrorState] = useState(false);
  const [itemToDisplay, setItemToDisplay] = useState(null);
  const showGalleryControls = itemToDisplay && itemToDisplay.images.length > 1;
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

  return (
    <Container>
      <Row>
        <h1>
          {itemToDisplay.title}
        </h1>
      </Row>
      <Row>
        <h2>{formatAsCurrency(itemToDisplay.price)}</h2>
      </Row>
      <Row
        className="justify-content-center"
      >
        <Carousel
          className="d-block col-sm-4 col-md-6 col-lg-8"
          controls={showGalleryControls}
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
                <Carousel.Caption
                  style={{
                    backgroundColor: 'rgba(188,193,191,0.65)',
                    color: 'white',
                    fontSize: '1.5vw',
                    fontWeight: 'bold',
                  }}
                >
                  <p>{image.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          }
        </Carousel>
      </Row>
      <Row className="mt-2 w-25 mx-auto">
        <AddToCartButton
          itemId={Number(itemId)}
        />
      </Row>
      <Row className="mt-2">
        <h4>{itemToDisplay.description}</h4>
      </Row>
    </Container>
  );
};

export default SingleItem;
