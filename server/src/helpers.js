/// <reference path="../index.d.ts" />
import dbg from 'debug';

export const debug = dbg('interview-server');

/**
 * Select a random winner, weighted by their strength
 *
 * @param {readonly Competitor[]} competitors List of event participants
 * @param {() => number} rng Random number generator
 */
export function decideWinner(competitors, rng = Math.random) {
  const strengths = competitors.map((c) => c.strength);
  const total = strengths.reduce((acc, v) => acc + Math.abs(v), 0);

  if (total <= 0) return;

  const probabilities = strengths.map((s) => s / total);
  const sample = rng();

  for (let offset = 0, current = 0; current < probabilities.length; ++current) {
    offset += probabilities[current];
    if (sample < offset) return competitors[current];
  }
}

/**
 * A simple hashing function
 * Based on http://www.cse.yorku.ca/~oz/hash.html
 *
 * @param {string} str string to hash
 */
export function djb2(str) {
  const hash = str
    .split('')
    .map((c) => c.codePointAt(0))
    .reduce((acc, c) => ((acc << 5) + acc) ^ c, 5381);

  // This converts the result to an unsigned int
  return hash >>> 0;
}

/**
 * In-place implementation of Fisher–Yates shuffle
 * @param {any[]} arr
 */
export function _shuffle(arr) {
  let i = arr.length;

  while (i) {
    let rndi = Math.floor(Math.random() * i--);
    let tmp = arr[i];

    arr[i] = arr[rndi];
    arr[rndi] = tmp;
  }

  return arr;
}

/**
 * A Fisher–Yates shuffle that returns a new copy of the array
 * * https://en.wikipedia.org/wiki/Fisher-Yates_shuffle
 * * https://bost.ocks.org/mike/shuffle/
 *
 * @param {readonly T[]} arr
 */
export const shuffle = (arr) => _shuffle([...arr]);

/**
 * Generate a random int
 * @param {number} min
 * @param {number} max
 */
export const randomInt = (min = 0, max = 0) =>
  Math.floor(Math.random() * (max - min) + min);
