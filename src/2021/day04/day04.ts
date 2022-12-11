import { slice } from "../../ArrayTools";
import { range } from "../../IterTools";

export function part1(lines: string[]) {
  const nums = readNums(lines);
  const bingoStrsArr = breakIntoBingos(lines);
  const boards = bingoStrsArr.map((s) => new BingoBoard(s));
  for (let num of nums) {
    for (let b of boards) {
      b.call(num);
      if (b.checkWin()) {
        return num * b.sumOfUnmarked();
      }
    }
  }
  return 0;
}

function readNums(lines: string[]) {
  return lines[0].split(",").map((s) => Number.parseInt(s));
}

function breakIntoBingos(lines: string[]): string[][] {
  const result: string[][] = [];
  for (let i = 2; i < lines.length; i += 6) {
    result.push(slice(lines, i, i + 5));
  }
  return result;
}

class BingoBoard {
  idxMap: Map<number, number>;
  numbers: number[];
  hits: number[];

  constructor(bingoStrs: string[]) {
    this.numbers = bingoStrs.flatMap(
      (str) => str.split(/\s+/).filter((v) => v.length > 0).map((v) => Number.parseInt(v))
    );
    this.idxMap = new Map();
    this.numbers.forEach((v, i) => this.idxMap.set(v, i));
    this.hits = Array.from(range(0, 25)).fill(0);
  }

  call(num: number) {
    const idx = this.idxMap.get(num);
    if (idx === undefined) {
      return;
    }
    this.hits[idx] = 1;
  }

  checkWin(): boolean {
    for (let i = 0; i < 5; i++) {
      if (slice(this.hits, i, undefined, 5).every((v) => v === 1)) {
        return true;
      }
    }
    for (let i = 0; i < 25; i += 5) {
      if (slice(this.hits, i, i + 5).every((v) => v === 1)) {
        return true;
      }
    }
    return false;
    
  }

  sumOfUnmarked(): number {
    let sum = 0;
    this.hits.forEach((v, i) => {
      if (!v) {
        sum += this.numbers[i];
      }
    });
    return sum;
  }
}


export function part2(lines: string[]) {
  const nums = readNums(lines);
  const bingoStrsArr = breakIntoBingos(lines);
  const boards = new Set(bingoStrsArr.map((s) => new BingoBoard(s)));
  for (let num of nums) {
    for (let b of boards) {
      b.call(num);
      if (b.checkWin()) {
        boards.delete(b);
        if (boards.size === 0) {
          return num * b.sumOfUnmarked();
        }
      }
    }
  }
  return 0;
}