// --- Day 5: Hydrothermal Venture ---
// Example input: "./exampleInput"

import { readFileSync } from "fs";

const readFileToArray = () => {
  const content = readFileSync("./input");
  return content.toString().split("\r\n");
};

const convertToDataPoints = (inputArray) => {
  const dataPoints = inputArray.map((pointsString) => {
    const [p1, p2] = pointsString.split(" -> ");
    return {
      p1: p1.split(",").map((val) => parseInt(val)),
      p2: p2.split(",").map((val) => parseInt(val)),
    };
  });
  return dataPoints;
};

// Gets the 2D sea map and fills it with zeros
const getSeaMap = (dataPoints) => {
  let xMax = 0,
    yMax = 0;
  dataPoints.forEach(({ p1, p2 }) => {
    if (p1[0] > xMax) xMax = p1[0];
    if (p2[0] > xMax) xMax = p2[0];
    if (p1[1] > yMax) yMax = p1[1];
    if (p2[1] > yMax) yMax = p2[1];
  });

  // Since 0 is also a valid datapoint both values are incremented
  yMax++, xMax++;

  const multiDimArray = new Array(yMax);
  for (let i = 0; i < multiDimArray.length; i++) {
    multiDimArray[i] = new Array(xMax).fill(0);
  }
  return multiDimArray;
};

const getScore = (seaMap) => {
  let score = 0;
  seaMap.forEach((row) => {
    row.forEach((val) => {
      if (val >= 2) score++;
    });
  });
  return score;
};

const markHorAndVerLines = (seaMap, datapoints) => {
  datapoints.forEach(({ p1, p2 }) => {
    if (p1[0] === p2[0]) {
      // Vertical line
      const yDist = p2[1] - p1[1];
      let absDist = Math.abs(yDist);
      let ptr = p1[1];
      if (yDist > 0) {
        // Downwards
        while (absDist >= 0) {
          seaMap[ptr][p1[0]]++;
          ptr++, absDist--;
        }
      } else {
        // Upwards
        while (absDist >= 0) {
          seaMap[ptr][p1[0]]++;
          ptr--, absDist--;
        }
      }
    } else {
      // Horizontal line
      const xDist = p2[0] - p1[0];
      let absDist = Math.abs(xDist);
      let ptr = p1[0];
      if (xDist > 0) {
        // Right
        while (absDist >= 0) {
          seaMap[p1[1]][ptr]++;
          ptr++, absDist--;
        }
      } else {
        // Left
        while (absDist >= 0) {
          seaMap[p1[1]][ptr]++;
          ptr--, absDist--;
        }
      }
    }
  });
};

// At how many points do at least two lines overlap?
const part1 = (datapoints) => {
  // Only keep horizontal and vertical lines
  const filteredDatapoints = datapoints.filter(
    ({ p1, p2 }) => p1[0] === p2[0] || p1[1] === p2[1]
  );

  const seaMap = getSeaMap(filteredDatapoints);
  markHorAndVerLines(seaMap, filteredDatapoints);

  console.log("Answer part1:", getScore(seaMap));
};

const markDiagonalLines = (seaMap, datapoints) => {
  // 4 direction: UP_LEFT, UP_RIGHT, DOWN_LEFT, DOWN_RIGHT
  datapoints.forEach(({ p1, p2 }) => {
    // X and Y dist will always be the same, using X here
    const xDist = p2[0] - p1[0];
    let absDist = Math.abs(xDist);
    let xPtr = p1[0],
      yPtr = p1[1];
    if (p2[1] > p1[1]) {
      // DOWN
      if (p2[0] > p1[0]) {
        // DOWN_RIGHT ↘
        while (absDist >= 0) {
          seaMap[yPtr][xPtr]++;
          xPtr++, yPtr++, absDist--;
        }
      } else {
        // DOWN_LEFT ↙
        while (absDist >= 0) {
          seaMap[yPtr][xPtr]++;
          xPtr--, yPtr++, absDist--;
        }
      }
    } else {
      // UP
      if (p2[0] > p1[0]) {
        // UP_RIGHT ↗
        while (absDist >= 0) {
          seaMap[yPtr][xPtr]++;
          xPtr++, yPtr--, absDist--;
        }
      } else {
        // UP_LEFT ↖
        while (absDist >= 0) {
          seaMap[yPtr][xPtr]++;
          xPtr--, yPtr--, absDist--;
        }
      }
    }
  });
};

// At how many points do at least two lines overlap?
const part2 = (datapoints) => {
  const horAndVertDataPoints = datapoints.filter(
    ({ p1, p2 }) => p1[0] === p2[0] || p1[1] === p2[1]
  );
  const diagonalDatapoints = datapoints.filter(
    ({ p1, p2 }) => p1[0] !== p2[0] && p1[1] !== p2[1]
  );

  const seaMap = getSeaMap(datapoints);
  markHorAndVerLines(seaMap, horAndVertDataPoints);
  markDiagonalLines(seaMap, diagonalDatapoints);

  console.log("Answer part1:", getScore(seaMap));
};

const main = () => {
  const inputArray = readFileToArray();
  const dataPoints = convertToDataPoints(inputArray);
  part1(dataPoints);
  part2(dataPoints);
};

main();
