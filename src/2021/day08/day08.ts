import { sum } from "../../IterTools";
import { union, subtract } from "../../SetUtils";

export function part1(lines: string[]) {
  return sum(lines.map((l) => l.split(" | ")[1])
    .map((ol) => ol.split(" ").map((w) => w.length)
      .filter((v) => v === 2 || v === 3 || v === 4 || v === 7))
    .map((a) => a.length));
}

export function part2(lines: string[]) {
  return sum(lines.map(solve));
}

function solve(line: string): number {
  const signals = line.split(" | ")[0].split(" ").map((s) => Array.from(s).sort().join(""));
  const strToNum = new Map<string, number>();

  const one = signals.filter((v) => v.length === 2)[0];
  const seven = signals.filter((v) => v.length === 3)[0];
  const four = signals.filter((v) => v.length === 4)[0];
  const eight = signals.filter((v) => v.length === 7)[0];
  const lenfive = signals.filter((v) => v.length === 5);
  const lensix = signals.filter((v) => v.length === 6);

  strToNum.set(one, 1);
  strToNum.set(seven, 7);
  strToNum.set(four, 4);
  strToNum.set(eight, 8);

  const a = subtract(new Set(seven), new Set(one)).values().next().value as string;

  const nine = lensix
    .filter((v) => subtract(new Set(v), union(new Set(four), new Set(seven))).size === 1)[0];

  const e = subtract(new Set(eight), new Set(nine)).values().next().value as string;

  const two = lenfive.filter((v) => new Set(v).has(e))[0];
  const five = lenfive.filter((v) => subtract(new Set(two), new Set(v)).size === 2)[0];
  const three = lenfive.filter((v) => subtract(new Set(two), new Set(v)).size === 1)[0];

  const g = subtract(new Set(nine), new Set(four + a)).values().next().value as string;
  const d = subtract(new Set(three), union(new Set(one + a + g))).values().next().value as string;
  const zero = lensix.filter((v) => !new Set(v).has(d))[0];

  strToNum.set(nine, 9);
  strToNum.set(two, 2);
  strToNum.set(five, 5);
  strToNum.set(three, 3);
  strToNum.set(zero, 0);

  const six = subtract(new Set(signals), new Set(strToNum.keys())).values().next().value as string;

  strToNum.set(six, 6);

  const results = line.split(" | ")[1].split(" ").map((s) => Array.from(s).sort().join(""));
  return 1000 * strToNum.get(results[0])! 
       + 100 * strToNum.get(results[1])!
       + 10 * strToNum.get(results[2])! 
       + strToNum.get(results[3])!
}

/**
 * lengths -> numbers
 * 2 -> 1
 * 3 -> 7
 * 4 -> 4
 * 5 -> 2 3 5
 * 6 -> 0 6 9
 * 7 -> 8
 * 
 * the way to figure shit out
 * a -> 7-1
 * 9 -> 6len - 4+7
 * e -> 8-9
 * 2 -> the one with e
 * 5 -> 2 diff from 2
 * 3 -> the last one of length 5
 * g -> 9-(a+4)
 * d -> 3-a-g-1
 * 0 -> the one without d
 * 6 -> the last one of length 6
 * 
 */