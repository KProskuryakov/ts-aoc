import { groupby, slice } from "../../ArrayTools";
import { sum } from "../../IterTools";
import { intersect } from "../../SetUtils";

export function part1(lines: string[]) {
  return sum(lines.map(line => {
    const firsthalf = new Set(slice(Array.from(line), 0, line.length / 2));
    const secondhalf = new Set(slice(Array.from(line), line.length / 2));

    const intersected = Array.from(intersect(firsthalf, secondhalf));
    const charcode = intersected[0].charCodeAt(0);
    return getPriority(charcode);
  }));
}

function getPriority(charcode: number) {
  if (charcode >= 97) {
    return charcode - 96;
  } else {
    return charcode - 64 + 26;
  }
}

export function part2(lines: string[]) {
  const groups = groupby(lines, (_, i) => Math.floor(i / 3));
  return sum(groups.map(lines => {
    const intersected = Array.from(lines.map(line => new Set(line)).reduce(intersect));
    const charcode = intersected[0].charCodeAt(0);
    return getPriority(charcode);
  }));
}