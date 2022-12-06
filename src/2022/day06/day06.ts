import { slice } from "../../ArrayTools";

export function part1(lines: string[]) {
  const line = lines[0];
  for (let i = 3; i < line.length; i++) {
    if (new Set(slice(Array.from(line), i - 3, i + 1)).size === 4) {
      return i + 1;
    }
  }
}

export function part2(lines: string[]) {
  const line = lines[0];
  for (let i = 13; i < line.length; i++) {
    if (new Set(slice(Array.from(line), i - 13, i + 1)).size === 14) {
      return i + 1;
    }
  }
}