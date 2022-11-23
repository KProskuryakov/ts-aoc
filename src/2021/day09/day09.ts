import { getDefault } from "../../ArrayTools";
import { min } from "../../IterTools";

export function part1(lines: string[]) {
  const heightmap = lines.map((line) => Array.from(line).map((c) => Number.parseInt(c)));
  const lowest = heightmap.map((line, row) => line.filter((val, col) => {
    const above = getDefault(heightmap[row-1], col, 9);
    const below = getDefault(heightmap[row+1], col, 9);
    const left = getDefault(heightmap[row], col-1, 9);
    const right = getDefault(heightmap[row], col+1, 9);
    return val < min(above, below, left, right);
  })).flat(1);
  return lowest.map((v) => v + 1).reduce((p, c) => p + c);
}

class Coord extends Object{
  row: number;
  col: number;
  val: number;
  heightmap: number[][];

  constructor(row: number, col: number, heightmap: number[][]) {
    super();
    this.row = row;
    this.col = col;
    this.val = getDefault(heightmap[row], col, 9);
    this.heightmap = heightmap;
  }

  above() {
    return new Coord(this.row-1, this.col, this.heightmap);
  }

  below() {
    return new Coord(this.row+1, this.col, this.heightmap);
  }

  left() {
    return new Coord(this.row, this.col-1, this.heightmap);
  }

  right() {
    return new Coord(this.row, this.col+1, this.heightmap);
  }

  cardinals() {
    return [this.above(), this.below(), this.left(), this.right()];
  }

  override toString() {
    return this.row + "," + this.col;
  }
}


export function part2(lines: string[]) {
  const heightmap = lines.map((line) => Array.from(line).map((c) => Number.parseInt(c)));
  const lowest: Coord[] = heightmap.map((line, row) => line.flatMap((val, col) => {
    const coord = new Coord(row, col, heightmap);
    if (val < min(coord.above().val, coord.below().val, coord.left().val, coord.right().val)) {
      return [coord];
    }
    return [];
  })).flat(1);

  const basin_sizes = lowest.map((low) => {
    let size = 1;
    let stack: Coord[] = [];
    let scanned = new Set<string>();

    scanned.add(low.toString());
    addSurrounds(low, stack, scanned);
    while (stack.length > 0) {
      const coord = stack.pop()!;
      if (!scanned.has(coord.toString())) {
        size++;
      }
      scanned.add(coord.toString());
      addSurrounds(coord, stack, scanned);
    }
    return size;
  });

  basin_sizes.sort((a, b) => b - a);

  return basin_sizes[0] * basin_sizes[1] * basin_sizes[2];
}

function addSurrounds(coord: Coord, stack: Coord[], scanned: Set<string>) {
  coord.cardinals().filter((c) => c.val < 9 && !scanned.has(c.toString())).forEach((c) => stack.push(c));
}