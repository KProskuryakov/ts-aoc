import { forEach2d, slice } from "../../ArrayTools";
import { range, zip2 } from "../../IterTools";

// @ts-ignore
import inputUrl from './input.txt'

fetch(inputUrl).then(res => {
  res.text().then(t => {
    code(t.split("\n"));
  })
});

function code(lines: string[]) {
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

  const left = Array.from(walls.values()).map(v => v.x).reduce((x1, x2) => Math.min(x1, x2)) - 100;
  const right = Array.from(walls.values()).map(v => v.x).reduce((x1, x2) => Math.max(x1, x2)) + 100;

  const divs: HTMLDivElement[][] = [];
  for (let i = 0; i < floor; i++) {
    const divline: HTMLDivElement[] = [];
    for (let j = 0; j < right - left; j++) {
      let newDiv = document.createElement("div");
      newDiv.style.top = (5 * i) + "px";
      newDiv.style.left = (5 * j) + "px";
      newDiv = document.body.appendChild(newDiv);
      divline.push(newDiv);
    }
    divs.push(divline);
  }

  console.log(left);
  console.log(right);

  forEach2d(divs, (div, row, col) => {
    if (walls.has((col + left) + "," + row)) {
      div.style.background = "black";
    }
  });

  const curSand = {x: 500, y: 0};

  function* moveSand() {
    let steps = 0;
    let stepCut = 100;
    while (!walls.has("500,0")) {
      if (curSand.x - left >= 0 && curSand.x < right && divs[curSand.y][curSand.x - left].style.background !== "white") {
        divs[curSand.y][curSand.x - left].style.background = "white";
      }
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
          curSand.x = 500;
          curSand.y = 0;
        }
      } else {
        walls.set(curSand.x + "," + curSand.y, {x: curSand.x, y: curSand.y});
        curSand.x = 500;
        curSand.y = 0;
        stepCut = 500;
      }
      steps = (steps + 1) % stepCut;
      if (steps % stepCut === 0) {
        yield;
      }
    }
  }

  const gen = moveSand();

  function step() {
    const res = gen.next();
    if (!res.done) {
      setTimeout(() => step(), 1);
    }
  }

  setTimeout(() => step(), 10);

  // let sandCount = 0;
  // const curSand = {x: 500, y: 0};
}