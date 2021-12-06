// --- Day 6: Lanternfish ---
// Example input: "./exampleInput"

import { readFileSync } from "fs";
import LanterFish from "./LanterFish.mjs";

const readFileToArray = () => {
  const content = readFileSync("./input");
  return content
    .toString()
    .split(",")
    .map((string) => parseInt(string));
};

// How many lanternfish would there be after 80 days?
const part1 = (inputArray, days) => {
  // Create initial list of lanterfishes
  const lanterFishes = inputArray.map((timer) => new LanterFish(timer));

  // Let lanterfishes live the amount of days
  for (let day = 0; day < days; day++) {
    let newBornFishes = [];

    lanterFishes.forEach((fish) => {
      const newBorn = fish.liveADay();
      if (newBorn) newBornFishes.push(newBorn);
    });

    lanterFishes.push(...newBornFishes);
  }
  console.log("Answer part1:", lanterFishes.length);
};

// How many lanternfish would there be after 256 days?
// NOTE: Problem is the Maximum call stack size is exceeded
// There is a cycle of 7 days and a cycle of 9 days, track these cycles
// instead of trying to represent each individual fish
const part2 = (inputArray, days) => {
  const nineDayCycle = Array(9).fill(0);
  const sevenDayCycle = Array(7).fill(0);

  // Create the initial cycle array
  inputArray.map((timer) => sevenDayCycle[timer]++);

  let ninePtr = 0,
    sevenPtr = 0;
  for (let day = 0; day < days; day++) {
    // Check the cycles for the current day

    // Temporary store the value so that it can be used later
    const tempSevenDayCycle = sevenDayCycle[sevenPtr];

    // Transfer over nine cycle fish to seven cycle fish
    sevenDayCycle[sevenPtr] += nineDayCycle[ninePtr];

    // Added because fish at that position create new fish (so amount stays)
    nineDayCycle[ninePtr] += tempSevenDayCycle;

    ninePtr++, sevenPtr++;

    // Reset the pointer if they are above their cycle
    ninePtr %= 9;
    sevenPtr %= 7;
  }

  const sumOfNine = nineDayCycle.reduce((prev, curr) => prev + curr, 0);
  const sumOfSeven = sevenDayCycle.reduce((prev, curr) => prev + curr, 0);

  console.log("Answer part2:", sumOfNine + sumOfSeven);
};

const main = () => {
  const inputArray = readFileToArray();
  part1(inputArray, 80);
  part2(inputArray, 256);
};

main();
