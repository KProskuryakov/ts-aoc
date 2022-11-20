import { parseCommaLineToInts } from "../../AocUtils";
import { min, range, sum } from "../../IterTools";

export function part1(line: string) {
  const crabs = parseCommaLineToInts(line).sort();
  return min(Infinity, ...Array.from(range(crabs[0], crabs[crabs.length-1])).map((i) => calcFuel(crabs, i)));
}

function calcFuel(crabs: number[], pos: number) {
  return sum(crabs.map((val) => Math.abs(val - pos)));
}

export function part2(line: string) {
  const crabs = parseCommaLineToInts(line).sort();
  return min(Infinity, ...Array.from(range(crabs[0], crabs[crabs.length-1])).map((i) => calcFuel2(crabs, i)));
}

function calcFuel2(crabs: number[], pos: number) {
  return sum(crabs.map((val) => {
    const dist = Math.abs(val - pos);
    return dist * (dist + 1) / 2;
  }));
}
