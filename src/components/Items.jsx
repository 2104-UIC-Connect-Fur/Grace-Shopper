import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import ListItem from "./ListItem";
import CreateItem from "./CreateItem";
import { getItemsFromQuery } from "../api/index";
import { verifyAdmin } from "../api";
import { store } from "./State";
import { formatQuery } from "../utils/data";

const Items = () => {
  const [isAdmin, updateAdmin] = useState(false);
  const { state, dispatch } = useContext(store);
  const { isLoggedIn } = state;
  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [noResults, setNoResults] = useState(false);
  const [displayItems, updateDisplayItems] = useState([]);
  const history = useHistory();
  const { location: { search } } = history;
  const queryObject = queryString.parse(search, {
    parseBooleans: true,
    parseNumbers: true,
  });

  const changePage = (currentPage) => {
    const tempQueryObject = {...queryObject};
    tempQueryObject.page = currentPage;
    const newQuery = formatQuery(tempQueryObject, 'string');
    setActivePage(currentPage);
    history.push({
      pathname: "/",
      search: `${newQuery}`,
    });
  };

  const paginationPages = [];
  for (let currentPage = 1; currentPage <= pages; currentPage += 1) {
    paginationPages.push(
      <Pagination.Item
        key={currentPage}
        active={currentPage === activePage}
        variant="outline-dark"
        onClick={() => {
          changePage(currentPage);
        }}
      >
        {currentPage}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    const getItems = async () => {
      const parsedSearch = queryString.parse(search, {
        parseNumbers: true,
        parseBooleans: true,
      });
      const formattedQuery = formatQuery(parsedSearch, 'object');
      const {
        items,
        success,
        totalResults,
        pages: apiPages,
      } = await getItemsFromQuery(formattedQuery);
      if (success && totalResults > 0) {
        updateDisplayItems(items);
        setPages(apiPages);
        setNoResults(false);
      } else if (success && totalResults === 0) {
        setPages(1);
        setNoResults(true);
      }
    };
    getItems();
  }, [search]);

  useEffect(() => {
    const checkforAdmin = async () => {
      const { success } = await verifyAdmin();
      if (success) {
        updateAdmin(true);
      } else updateAdmin(false);
    };
    checkforAdmin();
  }, [isAdmin, isLoggedIn]);

  return (
    <Container className="d-flex flex-row flex-wrap content-align-center justify-content-space-evenly mx-auto pt-3 main-content">
      <Container className="mb-2">
        <Row>{isAdmin ? <CreateItem /> : null}</Row>
      </Container>
      <Container>
        {noResults ? (
          <Row>
            <h1>No matching results for that search.</h1>
          </Row>
        ) : (
          <Row>
            {displayItems.map((item) => (
              <ListItem
              item={item}
              key={item.id}
              />
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
