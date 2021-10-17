/* eslint-disable import/prefer-default-export */
export class Shuffleable {
  constructor(inputArray) {
    let copiedData = [...inputArray];

    this.random = () => {
      const getrandomNumber = () => Math.floor(Math.random() * copiedData.length);
      const splicedQuote = copiedData.splice(getrandomNumber(), 1);
      if (copiedData.length === 0) {
        copiedData = [...inputArray];
      }
      return splicedQuote;
    };
  }
}
