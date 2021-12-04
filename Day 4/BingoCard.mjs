const copy = (arg) => JSON.parse(JSON.stringify(arg));

/**
 * A JS class that simulates a bingo card
 */
export default class BingoCard {
  /**
   * Should be provided with a 2D array
   * @param {number[][]} numbers
   */
  constructor(numbers) {
    this.gridSize = numbers.length;
    this.numbers = copy(numbers);
    this.unmarkedNumbers = copy(numbers);
    this.markedRowSum = new Array(this.gridSize).fill(0);
    this.markedColSum = new Array(this.gridSize).fill(0);
  }

  markNumber = (number) => {
    let rowIndex, colIndex;

    this.numbers.some((row, _rowIndex) => {
      const _colIndex = row.findIndex((colVal) => colVal === number);
      if (_colIndex > -1) {
        rowIndex = _rowIndex;
        colIndex = _colIndex;
        return true;
      }
    });

    if (rowIndex != null && colIndex != null) {
      this.unmarkedNumbers[rowIndex] = this.unmarkedNumbers[rowIndex].filter(
        (colVal) => colVal !== number
      );
      this.markedRowSum[rowIndex]++;
      this.markedColSum[colIndex]++;
    }
  };

  checkForBingo = () =>
    this.markedRowSum.includes(this.gridSize) ||
    this.markedColSum.includes(this.gridSize);

  getCardScore = () => {
    let sum = 0;
    if (this.checkForBingo()) {
      this.unmarkedNumbers.forEach((row) => {
        row.forEach((colValue) => {
          sum += colValue;
        });
      });
    }
    return sum;
  };
}
