import { cardinals, findIndex2d } from "../../ArrayTools";
import { min } from "../../IterTools";

export function part1(lines: string[]) {
  const elevations = lines.map(l => Array.from(l).map(c => {
    if (c === "S") {
      return {elevation: -1, steps: 0};
    } else if (c === "E") {
      return {elevation: 26, steps: Number.POSITIVE_INFINITY};
    }
    return {elevation: c.codePointAt(0)! - "a".codePointAt(0)!, steps: Number.POSITIVE_INFINITY};
  }));

  const processList: {row: number, col: number}[] = findIndex2d(elevations, (v) => v.elevation === -1);

  while(processList.length > 0) {
    const p = processList.shift()!;
    const curTile = elevations[p.row][p.col];
    const newSteps = curTile.steps + 1;
    cardinals(elevations, p.row, p.col).forEach(v => {
      const cardinalTile = elevations[v.row][v.col];
      if (newSteps < cardinalTile.steps && curTile.elevation >= cardinalTile.elevation - 1) {
        cardinalTile.steps = newSteps;
        processList.push({row: v.row, col: v.col});
      }
    });
  }

  const end = findIndex2d(elevations, (v) => v.elevation === 26)[0];

  return elevations[end.row][end.col].steps;
}

export function part2(lines: string[]) {
  const elevations = lines.map(l => Array.from(l).map(c => {
    if (c === "S") {
      return {elevation: 0, steps: Number.POSITIVE_INFINITY};
    } else if (c === "E") {
      return {elevation: 26, steps: 0};
    }
    return {elevation: c.codePointAt(0)! - "a".codePointAt(0)!, steps: Number.POSITIVE_INFINITY};
  }));

  const processList: {row: number, col: number}[] = findIndex2d(elevations, (v) => v.elevation === 26);

  while(processList.length > 0) {
    const p = processList.shift()!;
    const curTile = elevations[p.row][p.col];
    const newSteps = curTile.steps + 1;
    cardinals(elevations, p.row, p.col).forEach(v => {
      const cardinalTile = elevations[v.row][v.col];
      if (newSteps < cardinalTile.steps && curTile.elevation <= cardinalTile.elevation + 1) {
        cardinalTile.steps = newSteps;
        if (cardinalTile.elevation !== 0) {
          processList.push({row: v.row, col: v.col});
        }
      }
    });
  }

  const end = min(...findIndex2d(elevations, (v) => v.elevation === 0).map(i => elevations[i.row][i.col].steps));

  return end;
}