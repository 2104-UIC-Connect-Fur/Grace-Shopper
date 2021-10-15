/* eslint-disable import/prefer-default-export */
const createQuerySetString = (obj) => Object.keys(obj)
  .map((key, index) => `"${key}"=$${index + 1}`)
  .join(', ');

module.exports = createQuerySetString;
