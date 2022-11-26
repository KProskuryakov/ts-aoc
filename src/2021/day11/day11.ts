import { parseCharsToInts } from "../../AocUtils";
import { all2d, any2d, forEach2d, map2d, surrounds, update2d } from "../../ArrayTools";

export function part1(lines: string[]) {
  let field: number[][] = lines.map(v => parseCharsToInts(v));
  let bursts = 0;
  for (let i = 0; i < 100; i++) {
    field = map2d(field, v => v + 1);
    while (any2d(field, v => v > 9)) {
      forEach2d(field, (center_val, r, c, arr) => {
        if (center_val > 9) {
          surrounds(arr, r, c, (v) => {
            if (v !== 0) {
              return v + 1;
            } else {
              return 0;
            }
          });
          update2d(arr, r, c, () => 0);
        }
      });
    }
    forEach2d(field, (v) => {
      if (v === 0) {
        bursts++;
      }
    });
  }
  return bursts;
}


export function part2(lines: string[]) {
  let field: number[][] = lines.map(v => parseCharsToInts(v));
  for (let i = 0; ; i++) {
    field = map2d(field, v => v + 1);
    while (any2d(field, v => v > 9)) {
      forEach2d(field, (center_val, r, c, arr) => {
        if (center_val > 9) {
          surrounds(arr, r, c, (v) => {
            if (v !== 0) {
              return v + 1;
            } else {
              return 0;
            }
          });
          update2d(arr, r, c, () => 0);
        }
      });
    }
    if (all2d(field, (v) => v == 0)) {
      return i + 1;
    }
  }
}