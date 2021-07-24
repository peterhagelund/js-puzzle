# js-box

Command-line utility for solving a "letter-boxed" puzzle.

## Copyright and License

Copyright (c) 2021 Peter Hagelund

This software is licensed under the [MIT License](https://en.wikipedia.org/wiki/MIT_License)

See `LICENSE.txt`

## Background

Letter-boxed is a brain-teaser puzzle I have come across in The New York Times.

The puzzle is presented as a 4-sided box, with three letters on each side:

      G L R
    I       O
    E       A
    U       T
      D M P

No letters are repeated - it is always 12 different letters.

### Goal

The goal of the brain-teaser is to find words that combined utilize all of the 12 letters in the box.

Each puzzle has a goal of - typically - 4 or 5 words but could it could be more or less.

The best solution is considered to be the one using the fewest and shortest words possible.

### Constraints

* Each word must be a common word, found in the US English dictionary. ("Ain't" ain't in the dictionary 'cause "ain't" ain't a word!)
* No proper names may be used. ("state" yes, "Vermont" no.)
* Each consecutive word must start with the same letter as the last letter of the previous word. (e.g. "PLOD", "DARE", "EAGER".)
* Each consecutive letter within a word must be from a different side of the box. (from the example puzzle above, "DARE" yes, "DATE" no - as "A" and "T" are on the same side of the box.)

## Approach

There are likely several ways of writing a utility to do this. Rather than creating every possible word from the box and checking that against a dictionary, I chose to load words from a dictionary and filter out those that can't legally be made given the constraints and then look for a solution within that subset of words.

Empirically it makes sense to start with words of "high value" - i.e. words that use a large number of the letters and then look for solutions that require the fewest words and - overall - fewest letters.

When loading the dictionary, illegal words are filtered out and then the result of that filtering is sorted by value (letters used) and the word itself. Each word is encapsulated in a small object that also holds the word's value as well as the first and last character in order to more easily be able to string the words together.

The solution search itself is a brute-force recursive search. The general recursive processing is:

* Add the next word in the list to the current, possible solution.
* If that word solves the puzzle, see if it's a better solution than the current best one and, if so, make this the current best one.
* If that word adds to the number of letters use, recurse and try adding another word.
* Remove the word from the list and loop around.
* Within the main loop over the possible start words, a duration check is made that break out of that loop when time's up. (This check is approximate as the number of combinations for a given word can take an arbitrary long time, so rather than checking at every word the check is made at each new start word.)

The command-line argument gymnastics are mostly handled by `yargs` and allow the specification of:

* The 4 sides of 3 letters each.
* The goal.
* The maximum duration allotted to find a solution.

## Running

`node main.js -s GLR,OAT,DMP,IEU -g 4 -m 10`

Look for solutions to the above example puzzle with a goal of 4 words (or less) for no more than 10 seconds.