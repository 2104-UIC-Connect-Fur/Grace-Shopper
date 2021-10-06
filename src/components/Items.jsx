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
  const [userSearchString, updateUserSearchString] = useState('');
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
      const { items, success, totalResults } = await getItemsFromQuery(queryObject);
      if (success && totalResults > 0) {
        updateDisplayItems(items);
      }
    };
    getItems();
  }, [query]);
  const clickHandler = async (e) => {
    e.preventDefault();
    const URISearchString = encodeURI(userSearchString);
    setQuery(`?searchString=${URISearchString}`);
    history.push({
      pathname: '/items',
      search: `?searchString=${URISearchString}`,
    });
  };
  if (!displayItems.length) return (<h1>Loading...</h1>);

  return (
    <Container className="d-flex flex-row flex-wrap content-align-center justify-content-space-evenly mx-auto mt-3">
      <ItemSearch />
      <>
        <input type="text" value={userSearchString} onChange={(e) => { updateUserSearchString(e.target.value); }} />
        <button type="button" onClick={clickHandler}>Change search string</button>
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
