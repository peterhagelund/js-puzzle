import Yargs from "yargs";
import bee from "./bee.js";
import box from "./box.js";

function main(argv) {
  if (argv._.includes("bee")) {
    bee(argv);
  } else if (argv._.includes("box")) {
    box(argv);
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
