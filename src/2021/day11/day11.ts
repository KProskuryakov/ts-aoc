import { parseCharsToInts } from "../../AocUtils";
import { any2d, map2d } from "../../ArrayTools";

export function part1(lines: string[]) {
  let field: number[][] = lines.map(parseCharsToInts);
  let bursts = 0;
  for (let i = 0; i < 100; i++) {
    field = map2d(field, v => v + 1);
    while (any2d(field, v => v > 9)) {
      // iterate through all 10+
      // add 1 to all surrounding the 10+'s unless already 0
      // set all 10+ to 0
    }
    // count 0's and add to bursts var
  }
  return bursts;
}


export function part2(lines: string[]) {

}