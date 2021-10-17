import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import ListItem from './ListItem';
import { store } from './State';
import { getItemsFromQuery } from '../api/index';

const Items = () => {
  const { state, dispatch } = useContext(store);
  const { queryObject } = state;
  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [noResults, setNoResults] = useState(false);
  const [displayItems, updateDisplayItems] = useState([]);
  const { search } = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState(search);
  const updateQuery = (newQueryObject) => {
    dispatch({
      type: 'updateSearchQuery',
      value: newQueryObject,
    });
  };
  if (queryObject) queryObject.page = activePage;
  if (queryObject && (typeof queryObject.categoryIds === 'number')) {
    const categoryIdAsArray = [queryObject.categoryIds];
    queryObject.categoryIds = categoryIdAsArray;
  }

  const changePage = (currentPage) => {
    const tempQueryObject = { ...queryObject };
    tempQueryObject.page = currentPage;
    const tempQuery = queryString.stringify(tempQueryObject);
    updateQuery(tempQueryObject);
    setQuery(tempQuery);
    setActivePage(currentPage);
    history.push({
      pathname: '/',
      search: `${tempQuery}`,
    });
  };

  const paginationPages = [];
  for (let currentPage = 1; currentPage <= pages; currentPage += 1) {
    paginationPages.push(
      <Pagination.Item
        key={currentPage}
        active={currentPage === activePage}
        onClick={() => {
          changePage(currentPage);
        }}
      >
        {currentPage}
      </Pagination.Item>,
    );
  }

  useEffect(() => {
    if (query) {
      const parsedQuery = queryString.parse(query, {
        parseBooleans: true,
        parseNumbers: true,
      });
      updateQuery(parsedQuery);
    }
  }, []);
  // console.log('queryObject: ', queryObject);
  useEffect(() => {
    const getItems = async () => {
      const {
        items,
        success,
        totalResults,
        pages: apiPages,
      } = await getItemsFromQuery(queryObject);
      if (success && totalResults > 0) {
        console.log('fetched items: ', items);
        updateDisplayItems(items);
        setPages(apiPages);
        setNoResults(false);
      } else if (success && totalResults === 0) {
        setNoResults(true);
      }
    };
    getItems();
  }, [queryObject, activePage]);

  return (
    <Container className="d-flex flex-row flex-wrap content-align-center justify-content-space-evenly mx-auto mt-3">
      <Container>
        {noResults ? (
          <Row>
            <h1>No matching results for that search.</h1>
          </Row>
        ) : (
          <Row>
            {displayItems.map((item) => (
              <ListItem item={item} key={item.id} />
            ))}
          </Row>
        )}
        {pages > 1 && (
          <Row>
            <Pagination size="lg">{paginationPages}</Pagination>
          </Row>
        )}
      </Container>
    </Container>
  );
};

export default Items;
