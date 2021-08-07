import { readFileSync } from 'fs';

function readDictionary(path, middle, others) {
    const all = middle + others;
    return readFileSync(path, 'utf-8')
        .split('\n')
        .filter((line) => line.length > 3)
        .filter((line) => !line.includes('\''))
        .filter((line) => line[0] == line[0].toLowerCase())
        .map((line) => line.toUpperCase())
        .filter((line) => line.includes(middle))
        .filter((line) => {
            for (let i = 0; i < line.length; i++) {
                if (!all.includes(line[i])) {
                    return false;
                }
            }
            return true;
        })
        .sort((a, b) => b.length - a.length || a.localeCompare(b));
}

function bee(argv) {
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
    const words = readDictionary('dictionary.txt', middle, others);
    console.log(`Read ${words.length} words.`);
    words.forEach((word) => console.log(word));
}

export { bee };
