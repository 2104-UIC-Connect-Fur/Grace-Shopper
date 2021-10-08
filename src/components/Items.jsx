import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import ListItem from './ListItem';
import ItemSearch from './ItemSearch';
import { getItemsFromQuery } from '../api/index';

const Items = () => {
  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [noResults, setNoResults] = useState(false);
  const [displayItems, updateDisplayItems] = useState([]);
  const { search } = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState(search);
  const [queryObject, setQueryObject] = useState(queryString.parse(query, {
    parseBooleans: true,
    parseNumbers: true,
  }));
  queryObject.page = activePage;
  if (typeof queryObject.categoryIds === 'number') {
    const categoryIdAsArray = [queryObject.categoryIds];
    queryObject.categoryIds = categoryIdAsArray;
  }

  const changePage = (currentPage) => {
    const tempQueryObject = { ...queryObject };
    tempQueryObject.page = currentPage;
    const tempQuery = queryString.stringify(tempQueryObject);
    setQueryObject(tempQueryObject);
    setQuery(tempQuery);
    setActivePage(currentPage);
    history.push({
      pathname: '/items/',
      search: `${tempQuery}`,
    });
  };

  const paginationPages = [];
  for (let currentPage = 1; currentPage <= pages; currentPage += 1) {
    paginationPages.push(
      <Pagination.Item
        key={currentPage}
        active={currentPage === activePage}
        onClick={() => { changePage(currentPage); }}
      >
        {currentPage}
      </Pagination.Item>,
    );
  }
  // console.log('queryObject: ', queryObject);
  useEffect(() => {
    const getItems = async () => {
      const {
        items, success, totalResults, pages: apiPages,
      } = await getItemsFromQuery(queryObject);
      if (success && totalResults > 0) {
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
      <Row>
        <ItemSearch
          setQuery={setQuery}
          setQueryObject={setQueryObject}
        />
      </Row>
      {
        noResults ? (
          <Row>
            <h1>No matching results for that search.</h1>
          </Row>
        )
          : (
            <Row>
              {
        displayItems.map((item) => (
          <ListItem
            item={item}
            key={item.id}
          />
        ))
      }
            </Row>
          )
        }
      {
        (pages > 1)
        && (
          <Row>
            <Pagination size="lg">
              {paginationPages}
            </Pagination>
          </Row>
        )
      }
    </Container>
  );
};

export default Items;
