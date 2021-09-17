import Yargs from "yargs";
import bee from "./bee.js";
import box from "./box.js";

function main(argv) {
  if (argv._.includes("bee")) {
    const middle = argv.middle.toUpperCase();
    if (middle.length != 1) {
      console.log(`Expected a single middle letter but got ${middle.length}`);
      return;
    }
    const others = argv.others.toUpperCase();
    const size = new Set(argv.others).size;
    if (size != 6) {
      console.log(`Expected six unique other letters but got ${size}`);
      return;
    }
    bee(argv.dictionary, middle, others);
  } else if (argv._.includes("box")) {
    const sides = argv.sides.split(",");
    if (sides.length != 4) {
      console.log(`Expected 4 sides, but found ${sides.length}`);
      return;
    }
    for (let i = 0; i < 4; i++) {
      if (sides[i].length != 3) {
        console.log(`Expected side to have length 3, but found side ${i + 1} to be ${sides[i].length}`);
        return;
      } else {
        sides[i] = sides[i].toUpperCase();
      }
    }
    const size = new Set(sides.join("")).size;
    if (size != 12) {
      console.log(`Expected 12 unique letters but found ${size}`);
      return;
    }
    box(argv.dictionary, sides, argv.goal, argv.maxDuration);
  } else {
    console.log("No command specified");
  }
}

const argv = Yargs(process.argv.slice(2))
  .command("box", "Solve a letter boxed puzzle", {
    sides: {
      alias: "s",
      describe: "Specify the sides of the box",
      type: "string",
      demandOption: true,
    },
    dictionary: {
      alias: "d",
      describe: "The dictionary to load",
      type: "string",
      default: "dictionary.txt",
    },
    goal: { alias: "g", describe: "goal", type: "number", default: 5 },
    maxDuration: {
      alias: "m",
      describe: "The maximum duration in seconds",
      type: "number",
      default: 10,
    },
  })
  .command("bee", "Solve a spelling bee puzzle", {
    middle: {
      alias: "m",
      describe: "The required, middle letter",
      type: "string",
      demandOption: true,
    },
    others: {
      alias: "o",
      describe: "The other six letters",
      type: "string",
      demandOption: true,
    },
    dictionary: {
      alias: "d",
      describe: "The dictionary to load",
      type: "string",
      default: "dictionary.txt",
    },
  })
  .option("h", { alias: "help" })
  .option("v", { alias: "version" }).argv;

main(argv);
