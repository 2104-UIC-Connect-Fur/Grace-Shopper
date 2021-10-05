/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Container from 'react-bootstrap/Container';
import ListItem from './ListItem';
import { getItemsFromQuery } from '../api/index';

const Items = () => {
  const [displayItems, updateDisplayItems] = useState([]);
  const { search } = useLocation();
  const [query, setQuery] = useState(search);
  const history = useHistory();
  const queryObject = queryString.parse(query, {
    parseBooleans: true,
    parseNumbers: true,
    arrayFormat: 'comma',
  });
  console.log('queryObject: ', queryObject);
  useEffect(() => {
    const getItems = async () => {
      const allItems = await getItemsFromQuery(queryObject);
      updateDisplayItems(allItems);
    };
    getItems();
  }, [query]);
  const clickHandler = async (e) => {
    e.preventDefault();
    history.push({
      pathname: '/items',
      search: '?searchString=one%20eyed%20cat',
    });
    setQuery('?searchString=one%20eyed%20cat');
  };
  if (!displayItems.length) return (<h1>Loading...</h1>);

  return (
    <Container className="d-flex flex-row flex-wrap content-align-center justify-content-space-evenly mx-auto mt-3">
      <button type="button" onClick={clickHandler}>Change search string</button>
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
