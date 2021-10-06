/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Container from 'react-bootstrap/Container';
import ListItem from './ListItem';
import ItemSearch from './ItemSearch';
import { getItemsFromQuery } from '../api/index';

const Items = () => {
  const [displayItems, updateDisplayItems] = useState([]);
  const { search } = useLocation();
  const [query, setQuery] = useState(search);
  const queryObject = queryString.parse(query, {
    parseBooleans: true,
    parseNumbers: true,
  });
  if (typeof queryObject.categoryIds === 'number') {
    const categoryIdAsArray = [queryObject.categoryIds];
    queryObject.categoryIds = categoryIdAsArray;
  }
  console.log('queryObject: ', queryObject);
  useEffect(() => {
    const getItems = async () => {
      const { items, success, totalResults } = await getItemsFromQuery(queryObject);
      if (success && totalResults > 0) {
        updateDisplayItems(items);
      }
    };
    getItems();
  }, [query]);
  if (!displayItems.length) return (<h1>Loading...</h1>);

  return (
    <Container className="d-flex flex-row flex-wrap content-align-center justify-content-space-evenly mx-auto mt-3">
      <ItemSearch
        setQuery={setQuery}
      />
      <>
        {
        displayItems.map((item) => (
          <ListItem
            item={item}
            key={item.id}
          />
        ))
      }
      </>
    </Container>
  );
};

export default Items;
