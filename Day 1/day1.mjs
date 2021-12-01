// --- Day 1: Sonar Sweep ---
// Example input: [199,200,208,210,200,207,240,269,260,263]

import { readFileSync } from "fs";

const readFileToArray = () => {
  const content = readFileSync("./input");
  return content
    .toString()
    .split("\r\n")
    .map((string) => parseInt(string));
};

// How many measurements are larger than the previous measurement?
const part1 = (inputArray) => {
  let counter = 0;

  for (let i = 1; i < inputArray.length; i++) {
    if (inputArray[i - 1] < inputArray[i]) counter++;
  }
  console.log("Answer part1: ", counter);
};

// Consider sums of a three-measurement sliding window. How many sums are larger than the previous sum?
const part2 = (inputArray) => {
  let counter = 0;

  for (let i = 1; i < inputArray.length; i++) {
    if (
      inputArray[i - 1] &&
      inputArray[i] &&
      inputArray[i + 1] &&
      inputArray[i + 2]
    ) {
      if (
        inputArray[i - 1] + inputArray[i] + inputArray[i + 1] <
        inputArray[i] + inputArray[i + 1] + inputArray[i + 2]
      )
        counter++;
    }
  }
  console.log("Answer part2: ", counter);
};

const main = () => {
  const inputArray = readFileToArray();
  part1(inputArray);
  part2(inputArray);
};

main();
