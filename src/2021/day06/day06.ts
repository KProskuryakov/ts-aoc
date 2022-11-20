import { parseCommaLineToInts } from "../../AocUtils";
import { sum } from "../../IterTools";

export function part1(line: string) {
  const ints = parseCommaLineToInts(line);
  let status = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  ints.forEach((v) => status[v]++);
  for (let i = 0; i < 80; i++) {
    status = sim1(status);
  }
  return sum(status);
}

function sim1(status: number[]) {
  const newStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 8; i > 0; i--) {
    newStatus[i-1] = status[i];
  }
  newStatus[6] += status[0];
  newStatus[8] += status[0];
  return newStatus;
}


export function part2(line: string) {
  const ints = parseCommaLineToInts(line);
  let status = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  ints.forEach((v) => status[v]++);
  for (let i = 0; i < 256; i++) {
    status = sim1(status);
  }
  return sum(status);
}