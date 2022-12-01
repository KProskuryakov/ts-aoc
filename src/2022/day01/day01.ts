import { split } from "../../ArrayTools";
import { max, sum } from "../../IterTools";

export function part1(lines: string[]) {
  return max(...split(lines, "").map(group => sum(group.map(v => Number.parseInt(v)))));
}

export function part2(lines: string[]) {
  return sum(split(lines, "").map(group => sum(group.map(v => Number.parseInt(v)))).sort((a, b) => b - a).slice(0, 3));
}