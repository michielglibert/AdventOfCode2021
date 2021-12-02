// --- Day 2: Dive! ---
// Example input: ["forward 5","down 5","forward 8","up 3","down 8","forward 2"]

import { readFileSync } from "fs";

const readFileToArray = () => {
  const content = readFileSync("./input");
  return content.toString().split("\r\n");
};

// What do you get if you multiply your final horizontal position by your final depth?
const part1 = (inputArray) => {
  let x = 0,
    y = 0;

  inputArray.forEach((movement) => {
    let [direction, amount] = movement.split(" ");
    amount = parseInt(amount);
    switch (direction) {
      case "forward":
        x += amount;
        break;
      case "down":
        y += amount;
        break;
      case "up":
        y -= amount;
        break;
    }
  });

  console.log("Answer part1:", x * y);
};

// What do you get if you multiply your final horizontal position by your final depth?
const part2 = (inputArray) => {
  let x = 0,
    y = 0,
    z = 0;

  inputArray.forEach((movement) => {
    let [direction, amount] = movement.split(" ");
    amount = parseInt(amount);
    switch (direction) {
      case "forward":
        x += amount;
        y += z * amount;
        break;
      case "down":
        z += amount;
        break;
      case "up":
        z -= amount;
        break;
    }
  });

  console.log("Answer part2:", x * y);
};

const main = () => {
  const inputArray = readFileToArray();
  part1(inputArray);
  part2(inputArray);
};

main();
