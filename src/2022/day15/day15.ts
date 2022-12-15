import { sum } from "../../IterTools";

export function part1(lines: string[], yscan: number) {
  const sensorFields = lines.map(l => {
    const halves = l.split(": ");
    const left = halves[0].split("at ")[1];
    const leftsplit = left.split(", ");
    const sx = Number.parseInt(leftsplit[0].split("=")[1]);
    const sy = Number.parseInt(leftsplit[1].split("=")[1]);

    const right = halves[1].split("at ")[1];
    const rightsplit = right.split(", ");
    const bx = Number.parseInt(rightsplit[0].split("=")[1]);
    const by = Number.parseInt(rightsplit[1].split("=")[1]);

    const md = Math.abs(sx - bx) + Math.abs(sy - by);

    return {sx, sy, md};
  });

  const lengths: {x1: number, x2: number}[] = [];

  for (let f of sensorFields) {
    if (yscan > f.sy + f.md || yscan < f.sy - f.md) {
      continue; // outside the range
    }
    const ydist = f.md - Math.abs(f.sy - yscan);
    lengths.push({x1: f.sx - ydist, x2: f.sx + ydist});
  }

  return sum(merge(lengths).map(v => v.x2 - v.x1));
}

function intersects(a: {x1: number, x2: number}, b: {x1: number, x2: number}): boolean {
  return !(a.x1 < b.x1 - 1 && a.x2 < b.x1 - 1 || a.x1 > b.x2 + 1 && a.x2 > b.x2 + 1);
}

// function contains(outside: {x1: number, x2: number}, inside: {x1: number, x2: number}): boolean {
//   return inside.x1 >= outside.x1 && inside.x2 <= outside.x2;
// }

function merge(lengths: {x1: number, x2: number}[]) {
  lengths.sort((a, b) => a.x1 - b.x1);
  for (let i = 0; i < lengths.length - 1; i++) {
    if (intersects(lengths[i], lengths[i + 1])) {
      lengths[i].x1 = Math.min(lengths[i].x1, lengths[i + 1].x1);
      lengths[i].x2 = Math.max(lengths[i].x2, lengths[i + 1].x2);
      lengths.splice(i + 1, 1);
      i--;
    }
  }
  return lengths;
}

export function part2(lines: string[], searchArea: number) {
  const sensorFields = lines.map(l => {
    const halves = l.split(": ");
    const left = halves[0].split("at ")[1];
    const leftsplit = left.split(", ");
    const sx = Number.parseInt(leftsplit[0].split("=")[1]);
    const sy = Number.parseInt(leftsplit[1].split("=")[1]);

    const right = halves[1].split("at ")[1];
    const rightsplit = right.split(", ");
    const bx = Number.parseInt(rightsplit[0].split("=")[1]);
    const by = Number.parseInt(rightsplit[1].split("=")[1]);

    const md = Math.abs(sx - bx) + Math.abs(sy - by);

    return {sx, sy, md};
  });

  for (let y = 0; y <= searchArea; y++) {
    const lengths: {x1: number, x2: number}[] = [];

    for (let f of sensorFields) {
      if (y > f.sy + f.md || y < f.sy - f.md) {
        continue; // outside the range
      }
      const ydist = f.md - Math.abs(f.sy - y);
      lengths.push({x1: f.sx - ydist, x2: f.sx + ydist});
    }

    merge(lengths);

    if (lengths.length > 1) {
      return y + (lengths[0].x2 + 1) * 4000000;
    }
  }
  return -1;
}