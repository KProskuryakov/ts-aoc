import { map2, mapArray, slice, sum, zip2 } from "../../IterTools";

export function part1(lines: number[]) {
  return sum(map2(lines, slice(lines, 1), (a, b) => a >= b ? 0 : 1));
}

export function part2(lines: number[]) {
  return part1(Array.from(mapArray([lines, slice(lines, 1), slice(lines, 2)], sum)));
}