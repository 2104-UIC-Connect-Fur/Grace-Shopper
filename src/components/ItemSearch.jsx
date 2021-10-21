import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { func } from "prop-types";
import queryString from "query-string";
import { formatAsCurrency } from "../utils";
import { getAllCategories } from "../api";

const ItemSearch = ({ setQuery, setQueryObject }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const searchDefaults = {
    categoryIds: [],
    priceLow: 0,
    priceHigh: 100000000,
    userSearchTerm: "",
  };
  const [categoryIds, setCategoryIds] = useState(searchDefaults.categoryIds);
  const [priceLow, setPriceLow] = useState(searchDefaults.priceLow);
  const [priceHigh, setPriceHigh] = useState(searchDefaults.priceHigh);
  const [userSearchTerm, setUserSearchTerm] = useState(
    searchDefaults.userSearchTerm
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const { success, categories: fetchedCategories } =
        await getAllCategories();
      if (success) setCategories(fetchedCategories);
    };
    getCategories();
  }, []);
  const handleChange = (val) => setCategoryIds(val);


  const searchHandler = async () => {
    const useQueryObject =
      categoryIds.length ||
      priceLow !== searchDefaults.priceLow ||
      priceHigh !== searchDefaults.priceHigh ||
      userSearchTerm !== searchDefaults.userSearchTerm;
    const queryObject = {
      categoryIds,
      priceLow,
      priceHigh,
      searchString: userSearchTerm,
    };
    const queryToUse = useQueryObject ? queryObject : {};
    const query = queryString.stringify(queryToUse);
    setQuery(query);
    setQueryObject(queryToUse);
    history.push({
      pathname: "/",
      search: `${query}`,
    });
    setShow(false);
  };

  const clearSearch = () => {
    setCategoryIds(searchDefaults.categoryIds);
    setPriceLow(searchDefaults.priceLow);
    setPriceHigh(searchDefaults.priceHigh);
    setUserSearchTerm(searchDefaults.userSearchTerm);
    setQuery("");
    setQueryObject({});
    history.push({
      pathname: "/",
      search: "",
    });
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      event.preventDefault();
      searchHandler();
    }
  }

  return (
    <>
      <Button
        variant="outline-primary"
        onClick={handleShow}
        style={{
          margin: "auto",
          backgroundColor: "lightgray",
          border: "none",
          color: "black",
        }}
      >
        Search 🔎
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        className="content-align-center"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Refine Items</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={searchHandler}>
            <Form.Group as={Row} className="mb-3" controlId="Title">
              <Form.Label as={Row}>Search title or description</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="type your search here"
                value={userSearchTerm}
                onKeyPress={handleKeyPress}
                onChange={(event) => {
                  setUserSearchTerm(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Row} className="sm-12 lg-12" controlId="priceLow">
              <Form.Label as={Row}>
                Low price threshold ({formatAsCurrency(priceLow)})
              </Form.Label>
              <Form.Control
                sm={12}
                lg={12}
                type="range"
                value={priceLow}
                min={searchDefaults.priceLow}
                max={searchDefaults.priceHigh}
                step={1000}
                onChange={(e) => {
                  e.preventDefault();
                  setPriceLow(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Row} className="sm-12 lg-12" controlId="priceHigh">
              <Form.Label as={Row}>
                High price threshold ({formatAsCurrency(priceHigh)})
              </Form.Label>
              <Form.Control
                sm={12}
                lg={12}
                type="range"
                value={priceHigh}
                min={searchDefaults.priceLow}
                max={searchDefaults.priceHigh}
                step={1000}
                onChange={(e) => {
                  e.preventDefault();
                  setPriceHigh(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Row} className="sm-12 lg-12" controlId="categories">
              <Form.Label as={Row}>Categories</Form.Label>
              {categories.length > 0 && (
                <ToggleButtonGroup
                  as={Row}
                  className="sm-12 lg-12 flex-wrap justify-content-between"
                  type="checkbox"
                  value={categoryIds}
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <ToggleButton
                      key={category.id}
                      id={`tbg-btn-${category.id}`}
                      value={category.id}
                      variant="outline-primary"
                    >
                      {category.name}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              )}
            </Form.Group>
          </Form>
          <Row className="mt-2">
            <Button variant="outline-secondary" onClick={clearSearch} className="w-50">
              Clear Search
            </Button>
            <Button variant="outline-primary" onClick={searchHandler} className="w-50">
              Search
            </Button>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

ItemSearch.propTypes = {
  setQuery: func.isRequired,
  setQueryObject: func.isRequired,
};

export default ItemSearch;
