// --- Day 3: Binary Diagnostic ---
// Example input: ["00100","11110","10110","10111","10101","01111","00111","11100","10000","11001","00010","01010"]

import { readFileSync } from "fs";

const readFileToArray = () => {
  const content = readFileSync("./input");
  return content.toString().split("\r\n");
};

// What is the power consumption of the submarine?
const part1 = (inputArray) => {
  let gamma = "",
    epsilon = "";

  for (let ptr = 0; ptr < inputArray[0].length; ptr++) {
    let sum = 0;
    inputArray.forEach((val) => {
      if (val[ptr] === "1") sum += 1;
    });
    if (sum > inputArray.length / 2) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
  }

  let decGamma = parseInt(gamma, 2);
  let decEpsilon = parseInt(epsilon, 2);

  console.log("Answer part1:", decGamma * decEpsilon);
};

const getRating = (arr, reverse) => {
  let sum = 0;
  let nulSum = 0;
  let ptr = 0;

  while (arr.length > 1) {
    arr.forEach((val) => {
      if (val[ptr] === "1") sum += 1;
      if (val[ptr] === "0") nulSum += 1;
    });

    if (reverse ? sum >= nulSum : sum < nulSum) {
      arr = arr.filter((val) => val[ptr] === "1");
    } else {
      arr = arr.filter((val) => val[ptr] === "0");
    }

    sum = 0;
    nulSum = 0;
    ptr++;
  }

  return arr[0];
};

// What is the life support rating of the submarine
const part2 = (inputArray) => {
  const oxArray = [...inputArray];
  const co2Array = [...inputArray];

  let oxGen = parseInt(getRating(oxArray), 2);
  let co2Scrub = parseInt(getRating(co2Array, true), 2);

  console.log("Answer part2:", oxGen * co2Scrub);
};

const main = () => {
  const inputArray = readFileToArray();
  part1(inputArray);
  part2(inputArray);
};

main();
