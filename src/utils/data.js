/* eslint-disable import/prefer-default-export */
import queryString from 'query-string';

export class Shuffleable {
  constructor(inputArray) {
    let copiedData = [...inputArray];

    this.random = () => {
      const getrandomNumber = () => Math.floor(Math.random() * copiedData.length);
      const splicedItem = copiedData.splice(getrandomNumber(), 1);
      if (copiedData.length === 0) {
        copiedData = [...inputArray];
      }
      return splicedItem;
    };
  }
}

export const formatQuery = ({
  searchString,
  categoryIds,
  priceLow,
  priceHigh,
  page = 1,
}, returnType) => {
  const tempQuery = {
    page,
    categoryIds
  };
if (priceLow != null && priceLow > 0) {
  tempQuery.priceLow = Number(priceLow);
}
if (priceHigh != null) {
  tempQuery.priceHigh = Number(priceHigh);
}
if (typeof categoryIds === 'number') tempQuery.categoryIds = [categoryIds];
if (typeof categoryIds === 'string') tempQuery.categoryIds = [Number(categoryIds)];
if (categoryIds && categoryIds.length > 1) tempQuery.categoryIds = categoryIds;
if (searchString) tempQuery.searchString = searchString;
return (returnType === 'string') ? queryString.stringify(tempQuery) : tempQuery;
}

