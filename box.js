import { readFileSync } from "fs";

function readDictionary(path, sides) {
  const all = sides.join("");
  return readFileSync(path, "utf-8")
    .split("\n")
    .filter((line) => line.length > 0)
    .filter((line) => !line.includes("'"))
    .filter((line) => line[0] == line[0].toLowerCase())
    .map((line) => line.toUpperCase())
    .filter((line) => {
      let index = -1;
      for (let i = 0; i < line.length; i++) {
        if (!all.includes(line[i])) {
          return false;
        }
        for (let j = 0; j < sides.length; j++) {
          if (!sides[j].includes(line[i])) {
            continue;
          }
          if (j == index) {
            return false;
          }
          index = j;
          break;
        }
      }
      return true;
    })
    .map((line) => ({
      text: line,
      value: new Set(line).size,
      first: line[0],
      last: line[line.length - 1],
    }))
    .sort((a, b) => b.value - a.value || a.text.localeCompare(b.text));
}

function countUniqueLetters(solution) {
  return new Set(solution.map((word) => word.text).join("")).size;
}

function findSolutions(words, goal, maxDuration) {
  const end = Date.now() + (maxDuration > 0 ? maxDuration * 1000 : Number.MAX_SAFE_INTEGER);
  const BreakException = {};
  let bestSolution = null;
  try {
    words.forEach((word) => {
      console.log(`Start word '${word.text} with value ${word.value}.`);
      let currentSolution = [word];
      bestSolution = findSolution(words, currentSolution, bestSolution, countUniqueLetters(currentSolution), goal);
      if (Date.now() > end) {
        console.log("Time is up - ending.");
        throw BreakException;
      }
    });
  } catch (e) {
    if (e == BreakException) {
      console.log("Done.");
    } else {
      throw e;
    }
  }
  if (bestSolution == null) {
    console.log("No solution found.");
  } else {
    console.log(`Best solution is ${bestSolution.map((word) => word.text)}.`);
  }
}

function findSolution(words, currentSolution, bestSolution, uniqueLetters, goal) {
  if (currentSolution.length > goal) {
    return bestSolution;
  }
  words
    .filter((word) => !currentSolution.includes(word))
    .filter((word) => word.first == currentSolution[currentSolution.length - 1].last)
    .forEach((word) => {
      currentSolution.push(word);
      const _uniqueLetters = countUniqueLetters(currentSolution);
      if (_uniqueLetters == 12) {
        if (
          bestSolution == null ||
          currentSolution.length < bestSolution.length ||
          (currentSolution.length == bestSolution.length && _uniqueLetters < countUniqueLetters(bestSolution))
        ) {
          console.log(`Solution: ${currentSolution.map((word) => word.text)}.`);
          bestSolution = [...currentSolution];
        }
      } else if (_uniqueLetters > uniqueLetters) {
        bestSolution = findSolution(words, currentSolution, bestSolution, _uniqueLetters, goal);
      }
      currentSolution.pop();
    });
  return bestSolution;
}

function box(dictionary, sides, goal, maxDuration) {
  const words = readDictionary(dictionary, sides);
  console.log(`Read ${words.length} words.`);
  findSolutions(words, goal, maxDuration);
}

export default box;
