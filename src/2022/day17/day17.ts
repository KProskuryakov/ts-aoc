type Shape = number[][];

const bar = [[1, 1, 1, 1]]
const plus = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 1, 0]
]
const ell = [
  [0, 0, 1],
  [0, 0, 1],
  [1, 1, 1]
]
const line = [
  [1],
  [1],
  [1],
  [1]
]
const square = [
  [1, 1],
  [1, 1]
]

const order = [bar, plus, ell, line, square];

export function part1(lines: string[], pieces = 2022) {
  const moves = Array.from(lines[0]).map(c => c === ">" ? 1 : -1);

  const board = new Set<number>();
  let curHeight = 0;
  let curMove = 0;

  for (let i = 0; i < pieces; i++) {
    const shape = order[i % 5];
    let moving = true;
    let x = 2;
    let y = curHeight + 3;
    while (moving) {
      const move = moves[curMove];
      curMove++;
      curMove = curMove % moves.length;
      if (!collides(x + move, y, shape, board)) {
        x += move;
      }
      if (!collides(x, y - 1, shape, board)) {
        y -= 1;
      } else {
        fix(x, y, shape, board);
        moving = false;
        curHeight = Math.max(curHeight, y + shape.length);
      }
    }
  }
  return curHeight;
}

function collides(x: number, y: number, shape: Shape, board: Set<number>) {
  if (x < 0 || x + shape[0].length > 7) {
    return true;
  }
  if (y < 0) {
    return true;
  }
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (shape[i][j] === 1) { // check square
        if (board.has((y + shape.length - i - 1) * 7 + (x + j))) {
          return true;
        }
      }
    }
  }
  return false;
}

function fix(x: number, y: number, shape: Shape, board: Set<number>) {
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (shape[i][j] === 1) { // check square
        board.add((y + shape.length - i - 1) * 7 + (x + j));
      }
    }
  }
}

export function part2(lines: string[], pieces = 1000000000000) {
  const moves = Array.from(lines[0]).map(c => c === ">" ? 1 : -1);

  const board = new Set<number>();
  let curHeight = 0;
  let curMove = 0;

  for (let i = 0; i < pieces; i++) {
    const shape = order[i % 5];
    let moving = true;
    let x = 2;
    let y = curHeight + 3;
    while (moving) {
      const move = moves[curMove];
      curMove++;
      curMove = curMove % moves.length;
      if (!collides2(x + move, y, shape, board)) {
        x += move;
      }
      if (!collides2(x, y - 1, shape, board)) {
        y -= 1;
      } else {
        fix2(x, y, shape, board);
        moving = false;
        curHeight = Math.max(curHeight, y + shape.length);
      }
    }
  }
  return curHeight;
}

function collides2(x: number, y: number, shape: Shape, board: Set<number>) {
  if (x < 0 || x + shape[0].length > 7) {
    return true;
  }
  if (y < 0) {
    return true;
  }
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (shape[i][j] === 1) { // check square
        if (board.has((y + shape.length - i - 1) * 7 + (x + j))) {
          return true;
        }
      }
    }
  }
  return false;
}

function fix2(x: number, y: number, shape: Shape, board: Set<number>) {
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (shape[i][j] === 1) { // check square
        board.add((y + shape.length - i - 1) * 7 + (x + j));
      }
    }
  }
}