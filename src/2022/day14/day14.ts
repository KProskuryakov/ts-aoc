import { slice } from "../../ArrayTools";
import { range, zip2 } from "../../IterTools";

export function part1(lines: string[]) {
  const wallBounds = lines.map(l => l.split(" -> ").map(parts => parts.split(",").map(v => Number.parseInt(v))));

  const walls: Map<string, {x: number, y: number}> = new Map();
  for (let line of wallBounds) {
    const zipped = zip2(line, slice(line, 1));
    for (let [[ax, ay], [bx, by]] of zipped) {
      if (ax === bx) {
        for (let i of range(ay, by, 1, true)) {
          walls.set(ax + "," + i, {x: ax, y: i});
        }
      } else { // ay === by
        for (let i of range(ax, bx, 1, true)) {
          walls.set(i + "," + ay, {x: i, y: ay});
        }
      }
    }
  }

  const bottom = Array.from(walls.values()).map(v => v.y).reduce((y1, y2) => Math.max(y1, y2)) + 1;

  let sandCount = 0;
  const curSand = {x: 500, y: 0};
  while (curSand.y < bottom) {
    const nextY = curSand.y + 1;
    const leftX = curSand.x - 1;
    const rightX = curSand.x + 1;
    if (!walls.has(curSand.x + "," + nextY)) {
      curSand.y = nextY;
    } else if (!walls.has(leftX + "," + nextY)) {
      curSand.y = nextY;
      curSand.x = leftX;
    } else if (!walls.has(rightX + "," + nextY)) {
      curSand.y = nextY;
      curSand.x = rightX;
    } else {
      walls.set(curSand.x + "," + curSand.y, {x: curSand.x, y: curSand.y});
      sandCount++;
      curSand.x = 500;
      curSand.y = 0;
    }
  }

  return sandCount;
}

export function part2(lines: string[]) {
  const wallBounds = lines.map(l => l.split(" -> ").map(parts => parts.split(",").map(v => Number.parseInt(v))));

  const walls: Map<string, {x: number, y: number}> = new Map();
  for (let line of wallBounds) {
    const zipped = zip2(line, slice(line, 1));
    for (let [[ax, ay], [bx, by]] of zipped) {
      if (ax === bx) {
        for (let i of range(ay, by, 1, true)) {
          walls.set(ax + "," + i, {x: ax, y: i});
        }
      } else { // ay === by
        for (let i of range(ax, bx, 1, true)) {
          walls.set(i + "," + ay, {x: i, y: ay});
        }
      }
    }
  }

  const bottom = Array.from(walls.values()).map(v => v.y).reduce((y1, y2) => Math.max(y1, y2)) + 1;

  const floor = bottom + 1;

  let sandCount = 0;
  const curSand = {x: 500, y: 0};
  while (!walls.has("500,0")) {
    const nextY = curSand.y + 1;
    const leftX = curSand.x - 1;
    const rightX = curSand.x + 1;
    if (nextY !== floor) {
      if (!walls.has(curSand.x + "," + nextY)) {
        curSand.y = nextY;
      } else if (!walls.has(leftX + "," + nextY)) {
        curSand.y = nextY;
        curSand.x = leftX;
      } else if (!walls.has(rightX + "," + nextY)) {
        curSand.y = nextY;
        curSand.x = rightX;
      } else {
        walls.set(curSand.x + "," + curSand.y, {x: curSand.x, y: curSand.y});
        sandCount++;
        curSand.x = 500;
        curSand.y = 0;
      }
    } else {
      walls.set(curSand.x + "," + curSand.y, {x: curSand.x, y: curSand.y});
      sandCount++;
      curSand.x = 500;
      curSand.y = 0;
    }
  }

  return sandCount;
}