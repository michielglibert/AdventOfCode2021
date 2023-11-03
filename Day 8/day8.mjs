// --- Day 8: Seven Segment Search ---
// Example input: "./exampleInput"

import { readFileSync } from "fs";

const readFileToArray = () => {
  const content = readFileSync("./exampleInput");
  return content.toString().split("\r\n");
};

const getSegmentsWithOutput = (inputArray) => {
  const entryObjects = [];
  inputArray.forEach((entry) => {
    let [segments, output] = entry.split(" | ");
    segments = segments.split(" ");
    output = output.split(" ");

    entryObjects.push({
      segments,
      output,
    });
  });

  return entryObjects;
};

// In the output values, how many times do digits 1, 4, 7, or 8 appear?
const part1 = (entries) => {
  // We don't really need the segments, we can just look at the output and
  // check the length

  let sum = 0;

  entries.forEach((entry) => {
    entry.output.forEach((combination) => {
      if ([2, 3, 4, 7].includes(combination.length)) sum++;
    });
  });

  console.log("Answer part1:", sum);
};

// What do you get if you add up all of the output values?
const part2 = (entries) => {
  let sum = 0;

  entries.forEach((entry) => {
    const map = {};

    entry.segments.forEach((comb) => {
      const cArr = comb.split("");
      if (cArr.every((item) => ["a", "b"].includes(item))) map[comb] = "1";
      else if (cArr.every((item) => ["d", "a", "b"].includes(item)))
        map[comb] = "7";
      else if (cArr.every((item) => ["e", "f", "a", "b"].includes(item)))
        map[comb] = "4";
      else if (cArr.every((item) => ["d", "a", "f", "g", "c"].includes(item)))
        map[comb] = "2";
      else if (cArr.every((item) => ["d", "a", "f", "b", "c"].includes(item)))
        map[comb] = "3";
      else if (cArr.every((item) => ["d", "e", "f", "b", "c"].includes(item)))
        map[comb] = "5";
      else if (
        cArr.every((item) => ["d", "e", "f", "g", "b", "c"].includes(item))
      )
        map[comb] = "6";
      else if (
        cArr.every((item) => ["d", "e", "a", "f", "b", "c"].includes(item))
      )
        map[comb] = "9";
      else if (
        cArr.every((item) => ["d", "a", "e", "f", "g", "b", "c"].includes(item))
      )
        map[comb] = "8";
    });
    console.log(map);

    let stringNumber = "";

    entry.output.forEach((comb) => {
      stringNumber += map[comb];
    });

    sum += parseInt(stringNumber);
  });

  console.log("Answer part2:", sum);
};

const main = () => {
  const inputArray = readFileToArray();
  const entries = getSegmentsWithOutput(inputArray);
  part1(entries);
  part2(entries);
};

main();
