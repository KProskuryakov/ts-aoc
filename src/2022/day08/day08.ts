import { parseCharsToInts } from "../../AocUtils";
import { max } from "../../IterTools";

export function part1(lines: string[]) {
  const trees = lines.map(l => parseCharsToInts(l));
  
  const scanned: boolean[][] = [];
  for (let l of trees) {
    const scanline: boolean[] = [];
    for (let _ of l) {
      scanline.push(false);
    }
    scanned.push(scanline);
  }

  const width = trees[0].length;
  const height = trees.length;

  let totalVisible = 0;

  for (let x = 0; x < width; x++) { // from above
    let curHighest = -1;
    for (let y = 0; curHighest < 9 && y < height; y++) {
      const tree = trees[y][x];
      if (tree > curHighest) {
        if (scanned[y][x] === false) {
          totalVisible++;
        }
        scanned[y][x] = true;
        curHighest = tree;

      }
    }
  }

  for (let x = 0; x < width; x++) { // from below
    let curHighest = -1;
    for (let y = height - 1; curHighest < 9 && y >= 0; y--) {
      const tree = trees[y][x];
      if (tree > curHighest) {
        if (scanned[y][x] === false) {
          totalVisible++;
        }
        scanned[y][x] = true;
        curHighest = tree;

      }
    }
  }

  for (let y = 0; y < height; y++) { // from left
    let curHighest = -1;
    for (let x = 0; curHighest < 9 && x < width; x++) {
      const tree = trees[y][x];
      if (tree > curHighest) {
        if (scanned[y][x] === false) {
          totalVisible++;
        }
        scanned[y][x] = true;
        curHighest = tree;

      }
    }
  }

  for (let y = 0; y < height; y++) { // from right
    let curHighest = -1;
    for (let x = width - 1; curHighest < 9 && x >= 0; x--) {
      const tree = trees[y][x];
      if (tree > curHighest) {
        if (scanned[y][x] === false) {
          totalVisible++;
        }
        scanned[y][x] = true;
        curHighest = tree;

      }
    }
  }

  return totalVisible;
}

export function part2(lines: string[]) {
  const trees = lines.map(l => parseCharsToInts(l));

  const width = trees[0].length;
  const height = trees.length;

  function scenicScore(x: number, y: number) {
    const curTree = trees[y][x];
    let score = 1;
    let visible = 0;
    for (let xi = x - 1; xi >= 0; xi--) { // left
      visible++;
      if (trees[y][xi] >= curTree) {
        break;
      }
    }
    score *= visible;
    visible = 0;
    for (let xi = x + 1; xi < width; xi++) { // right
      visible++;
      if (trees[y][xi] >= curTree) {
        break;
      }
    }
    score *= visible;
    visible = 0;
    for (let yi = y + 1; yi < height; yi++) { // down
      visible++;
      if (trees[yi][x] >= curTree) {
        break;
      }
    }
    score *= visible;
    visible = 0;
    for (let yi = y - 1; yi >= 0; yi--) { // up
      visible++;
      if (trees[yi][x] >= curTree) {
        break;
      }
    }
    score *= visible;
    return score;
  }

  return trees.map((l, y) => l.map((_, x) => scenicScore(x, y)).reduce((p, c) => max(p, c))).reduce((p, c) => max(p, c));
}

