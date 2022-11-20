import { range, zip2 } from "../../IterTools";

export function part1(strLines: string[]) {
  const lines = strLines.map((v) => parseLine(v)).filter(isStraight);
  const map = new Map<string, number>();
  lines.forEach((line) => {
    for (let p of pointsFromLine(line)) {
      const val = map.get(p);
      if (val === undefined) {
        map.set(p, 1);
      } else {
        map.set(p, val + 1);
      }
    }
  });
  return Array.from(map.values()).filter((v) => v > 1).length;
}

type Line = { x1: number, y1: number, x2: number, y2: number }

function parseLine(linestr: string): Line {
  const splits = linestr.split(" -> ").map((p) => p.split(",").map((v) => Number.parseInt(v)));
  return { x1: splits[0][0], y1: splits[0][1], x2: splits[1][0], y2: splits[1][1] };
}

function isStraight(line: Line) {
  return line.x1 === line.x2 || line.y1 === line.y2;
}

function* pointsFromLine(line: Line): Generator<string> {
  if (line.x1 === line.x2) {
    for (let i of range(line.y1, line.y2, 1, true)) {
      yield `x${line.x1}y${i}`
    }
  } else {
    for (let i of range(line.x1, line.x2, 1, true)) {
      yield `x${i}y${line.y1}`
    }
  }
}

export function part2(strLines: string[]) {
  const lines = strLines.map((v) => parseLine(v));
  const map = new Map<string, number>();
  lines.forEach((line) => {
    for (let p of pointsFromLine2(line)) {
      const val = map.get(p);
      if (val === undefined) {
        map.set(p, 1);
      } else {
        map.set(p, val + 1);
      }
    }
  });
  return Array.from(map.values()).filter((v) => v > 1).length;
}

function* pointsFromLine2(line: Line): Generator<string> {
  if (line.x1 === line.x2) {
    for (let i of range(line.y1, line.y2, 1, true)) {
      yield `x${line.x1}y${i}`
    }
  } else if (line.y1 === line.y2) {
    for (let i of range(line.x1, line.x2, 1, true)) {
      yield `x${i}y${line.y1}`
    }
  } else {
    for (let i of zip2(range(line.x1, line.x2, 1, true), range(line.y1, line.y2, 1, true))) {
      yield `x${i[0]}y${i[1]}`
    }
  }
}