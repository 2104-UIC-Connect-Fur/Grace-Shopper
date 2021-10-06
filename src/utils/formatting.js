/* eslint-disable import/prefer-default-export */
export const formatAsCurrency = (numberInCents) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numberInCents / 100);
