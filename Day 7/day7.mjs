// --- Day 7: The Treachery of Whales ---
// Example input: "./exampleInput"

import { readFileSync } from "fs";

const readFileToArray = () => {
  const content = readFileSync("./input");
  return content
    .toString()
    .split(",")
    .map((string) => parseInt(string));
};

// How much fuel must they spend to align to that position?
const part1 = (inputArray) => {
  // Getting the median value is the solution here as the middle ensures the majority has the shortest distance
  // while the minority will have to do the most steps. In case of uneven, the 2 middle number should be
  // calculated and checked. This solution avoids having the check every possibility.

  // Sort to get the median
  const sortedArray = inputArray.sort((a, b) => a - b);

  let fuel;

  if (sortedArray.length % 2 === 0) {
    // EVEN
    // Calculate both and take most optimal
    let sum1 = 0,
      sum2 = 0;
    sortedArray.forEach((number) => {
      sum1 += Math.abs(sortedArray[sortedArray.length / 2] - number);
      sum2 += Math.abs(sortedArray[sortedArray.length / 2 + 1] - number);
    });
    fuel = sum1 > sum2 ? sum2 : sum1;
  } else {
    // UNEVEN
    let sum = 0;
    sortedArray.forEach((number) => {
      sum += Math.abs(sortedArray[sortedArray.length - 1 / 2 + 1] - number);
    });
    fuel = sum;
  }

  console.log("Answer part1:", fuel);
};

// How much fuel must they spend to align to that position?
const part2 = (inputArray) => {
  // In the contrary, getting the average is the soluton here. Since each extra step causes a penalty,
  // searching for the median doesn't help as the "minority" will cause a extra large penalty. It's therefore
  // better if everyone does the shortest distance to a point, which is the average of all positions.
  // Because the average can be a floating point number, both the ceil() and floor() should be checked on
  // what is the most optimal of the 2.This solution also avoids having the check every possibility.

  // Get the average of all the numbers
  const average = Math.floor(
    inputArray.reduce((prev, curr) => prev + curr, 0) / inputArray.length
  );

  // Calculate with the position as the average
  let fuel1 = 0,
    fuel2 = 0;
  inputArray.forEach((number) => {
    const distance1 = Math.abs(average - number);
    const distance2 = Math.abs(average + 1 - number);
    for (let step = 1; step <= distance1; step++) {
      fuel1 += step;
    }

    for (let step = 1; step <= distance2; step++) {
      fuel2 += step;
    }
  });

  console.log("Answer part2:", fuel1 > fuel2 ? fuel2 : fuel1);
};

const main = () => {
  const inputArray = readFileToArray();
  part1(inputArray);
  part2(inputArray);
};

main();
