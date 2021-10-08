import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import OffCanvas from 'react-bootstrap/OffCanvas';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { func } from 'prop-types';
import queryString from 'query-string';
import { formatAsCurrency } from '../utils';
import { getAllCategories } from '../api';

const ItemSearch = ({ setQuery, setQueryObject }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categoryIds, setCategoryIds] = useState([]);
  const [priceLow, setPriceLow] = useState(0);
  const [priceHigh, setPriceHigh] = useState(1000000);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  // console.log('state: ', {
  //   categoryIds,
  //   priceLow,
  //   priceHigh,
  //   userSearchTerm,
  // });
  useEffect(() => {
    const getCategories = async () => {
      const { success, categories: fetchedCategories } = await getAllCategories();
      if (success) setCategories(fetchedCategories);
    };
    getCategories();
  }, []);
  const handleChange = (val) => setCategoryIds(val);

  const searchHandler = async () => {
    const queryObject = {
      categoryIds,
      priceLow,
      priceHigh,
      searchString: userSearchTerm,
    };
    const query = queryString.stringify(queryObject);
    setQuery(query);
    setQueryObject(queryObject);
    history.push({
      pathname: '/items/',
      search: `${query}`,
    });
    setShow(false);
  };

  const clearSearch = () => {
    setCategoryIds([]);
    setPriceLow(0);
    setPriceHigh(1000000);
    setUserSearchTerm('');
    setQuery('');
    setQueryObject({});
    history.push({
      pathname: '/items/',
      search: '',
    });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Search items
      </Button>

      <OffCanvas show={show} onHide={handleClose} className="content-align-center">
        <OffCanvas.Header closeButton>
          <OffCanvas.Title>Refine Items</OffCanvas.Title>
        </OffCanvas.Header>
        <OffCanvas.Body>
          <Form onSubmit={searchHandler}>
            <Form.Group as={Row} className="mb-3" controlId="Title">
              <Form.Label as={Row}>
                Search title or description
              </Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="type your search here"
                value={userSearchTerm}
                onChange={(event) => {
                  setUserSearchTerm(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Row} className="sm-12 lg-12" controlId="priceLow">
              <Form.Label as={Row}>
                Low price threshold (
                {formatAsCurrency(priceLow)}
                )
              </Form.Label>
              <Form.Control
                sm={12}
                lg={12}
                type="range"
                value={priceLow}
                min="0"
                max="1000000"
                step={1000}
                onChange={(e) => {
                  e.preventDefault();
                  setPriceLow(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Row} className="sm-12 lg-12" controlId="priceHigh">
              <Form.Label as={Row}>
                High price threshold (
                {formatAsCurrency(priceHigh)}
                )
              </Form.Label>
              <Form.Control
                sm={12}
                lg={12}
                type="range"
                value={priceHigh}
                min="0"
                max="1000000"
                step={1000}
                onChange={(e) => {
                  e.preventDefault();
                  setPriceHigh(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Row} className="sm-12 lg-12" controlId="categories">
              <Form.Label as={Row}>
                Categories
              </Form.Label>
              {
                (categories.length > 0) && (
                  <ToggleButtonGroup
                    as={Row}
                    className="sm-12 lg-12 flex-wrap justify-content-between"
                    type="checkbox"
                    value={categoryIds}
                    onChange={handleChange}
                  >
                    {
                      categories.map((category) => (
                        <ToggleButton
                          key={category.id}
                          id={`tbg-btn-${category.id}`}
                          value={category.id}
                          variant="outline-primary"
                        >
                          {category.name}
                        </ToggleButton>
                      ))
                    }
                  </ToggleButtonGroup>
                )
              }
            </Form.Group>
          </Form>
          <Row className="mt-2">
            <Button variant="secondary" onClick={clearSearch} className="w-50">
              Clear Search
            </Button>
            <Button variant="primary" onClick={searchHandler} className="w-50">
              Search
            </Button>
          </Row>
        </OffCanvas.Body>
      </OffCanvas>
    </>
  );
};

ItemSearch.propTypes = {
  setQuery: func.isRequired,
  setQueryObject: func.isRequired,
};

export default ItemSearch;
