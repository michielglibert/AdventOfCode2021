// --- Day 4: Giant Squid ---
// Example input: "./exampleInput"

import { readFileSync } from "fs";
import BingoCard from "./BingoCard.mjs";

const readBingoInput = () => {
  const content = readFileSync("./input");
  return content.toString().split("\r\n\r\n");
};

const getBingoNumbers = (inputArray) =>
  inputArray[0].split(",").map((num) => parseInt(num));

const getBingoBoards = (inputArray) => {
  const cards = inputArray.map((card) =>
    card.split("\r\n").map((row) =>
      row
        .replace(/\s+/g, " ")
        .split(" ")
        .filter((num) => !!num)
        .map((num) => parseInt(num))
    )
  );
  const boardObjects = cards.map((card) => new BingoCard(card));
  return boardObjects;
};

// What will your final score be if you choose that board?
const part1 = (bingoNumbers, bingoCards) => {
  let score = 0;
  let lastNumber;
  bingoNumbers.some((number) => {
    lastNumber = number;
    return bingoCards.some((card) => {
      card.markNumber(number);
      if (card.checkForBingo()) {
        score = card.getCardScore();
        return true;
      }
    });
  });
  console.log("Answer part1:", score * lastNumber);
};

// Once it wins, what would its final score be?
const part2 = (bingoNumbers, bingoCards) => {
  let lastNumber, lastWonCard;
  bingoNumbers.forEach((number) => {
    bingoCards = bingoCards.filter((card) => {
      card.markNumber(number);
      if (card.checkForBingo()) {
        lastWonCard = card;
        lastNumber = number;
        return false;
      }
      return true;
    });
  });

  const score = lastWonCard.getCardScore();
  console.log("Answer part2:", score * lastNumber);
};

const main = () => {
  const inputArray = readBingoInput();
  const bingoNumbers = getBingoNumbers(inputArray);
  inputArray.splice(0, 1);
  part1(bingoNumbers, getBingoBoards(inputArray));
  part2(bingoNumbers, getBingoBoards(inputArray));
};

main();
