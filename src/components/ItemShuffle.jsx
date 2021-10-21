import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Shuffle } from 'react-bootstrap-icons';
import { Shuffleable } from '../utils/data';
import { getAllItemIds } from '../api';

const ItemShuffle = () => {
  const [shuffleObject, setShuffleObject] = useState(null);
  useEffect(() => {
    const getItemIds = async () => {
      const { success, itemsArray } = await getAllItemIds();
      if (success) {
        const shuffleableIds = new Shuffleable(itemsArray);
        setShuffleObject(shuffleableIds);
      }
    };
    getItemIds();
  }, []);
  const history = useHistory();
  if (shuffleObject) return (
    <Button
      variant="outline-dark"
      style={{
        width: "70%",
        margin: "auto",
        border: "none",
        fontSize: "2rem",
      }}
      onClick={() => {
        const itemId = shuffleObject.random();
        history.push(`/items/${itemId}`);
      }}
    >
      <Shuffle />
    </Button>
  );
return null;
};

export default ItemShuffle;
