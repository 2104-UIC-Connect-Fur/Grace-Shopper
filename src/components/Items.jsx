import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import ListItem from "./ListItem";
import ItemSearch from "./ItemSearch";
import CreateItem from "./CreateItem";
import { getItemsFromQuery } from "../api/index";
import Button from "react-bootstrap/Button";
import { verifyAdmin } from "../api";

const Items = () => {
  const [isAdmin, updateAdmin] = useState(false);
  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [noResults, setNoResults] = useState(false);
  const [displayItems, updateDisplayItems] = useState([]);
  const { search } = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState(search);
  const [toggleModifyItems, setToggleModifyItems] = useState(false);
  const [queryObject, setQueryObject] = useState(
    queryString.parse(query, {
      parseBooleans: true,
      parseNumbers: true,
    })
  );
  queryObject.page = activePage;
  if (typeof queryObject.categoryIds === "number") {
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
      pathname: "/items/",
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
      </Pagination.Item>
    );
  }
  useEffect(() => {
    const getItems = async () => {
      const {
        items,
        success,
        totalResults,
        pages: apiPages,
      } = await getItemsFromQuery(queryObject);
      if (success && totalResults > 0) {
        console.log("fetched items: ", items);
        updateDisplayItems(items);
        setPages(apiPages);
        setNoResults(false);
      } else if (success && totalResults === 0) {
        setNoResults(true);
      }
    };
    getItems();
  }, [queryObject, activePage]);

  useEffect(() => {
    const checkforAdmin = async () => {
      const { success, message } = await verifyAdmin();
      if (success && message) {
        updateAdmin(true);
      }
    };
    checkforAdmin();
  }, [isAdmin]);

  const toggleClick = () => {
    setToggleModifyItems(!toggleModifyItems);
    console.log(toggleModifyItems);
  };

  return (
    <Container className="d-flex flex-row flex-wrap content-align-center justify-content-space-evenly mx-auto mt-3">
      <Container className="mb-2">
        <Row>
          <ItemSearch setQuery={setQuery} setQueryObject={setQueryObject} />
          {isAdmin ? (
            <Button
              onClick={toggleClick}
              variant="info"
              style={{
                width: "10%",
                margin: "auto",
              }}
            >
              Modify Items
            </Button>
          ) : null}
          {isAdmin ? <CreateItem /> : null}
        </Row>
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
                showModifyItemsButton={toggleModifyItems}
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
