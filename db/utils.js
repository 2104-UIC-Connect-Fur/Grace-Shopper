/* eslint-disable import/prefer-default-export */
const createQuerySetString = (obj) => Object.keys(obj)
  .map((key, index) => `"${key}"=$${index + 1}`)
  .join(', ');

const createQueryInsertString = (obj) => Object.keys(obj).map(
  (key) => `"${key}"`,
).join(', ');

const createQueryValuesString = (obj) => Object.keys(obj).map(
  (key, index) => `$${index + 1}`,
).join(', ');

module.exports = {
  createQuerySetString,
  createQueryInsertString,
  createQueryValuesString,
};
