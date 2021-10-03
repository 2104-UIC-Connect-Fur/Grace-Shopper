import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListItem from './ListItem';
import { getAllItems } from '../api/index';

const Items = () => {
  const [displayItems, updateDisplayItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      const allItems = await getAllItems();
      updateDisplayItems(allItems);
    };
    getItems();
  }, []);
  if (!displayItems.length) return (<h1>Loading...</h1>);

  return (
    <Container className="d-flex flex-row flex-wrap content-align-center justify-content-space-evenly mx-auto mt-3">
      {
        displayItems.map((item) => (
          <ListItem
            item={item}
            key={item.id}
          />
        ))
      }
    </Container>
  );
};

export default Items;
