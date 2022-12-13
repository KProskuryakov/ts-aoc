import { cardinals, findIndex2d, forEach2d } from '../../ArrayTools';

// @ts-ignore
import inputUrl from './input.txt'

fetch(inputUrl).then(res => {
  res.text().then(t => {
    code(t.split("\n"));
  })
});

function code(lines: string[]) {
  const elevations = lines.map(l => Array.from(l).map(c => {
    if (c === "S") {
      return {elevation: -1, steps: 0};
    } else if (c === "E") {
      return {elevation: 26, steps: Number.POSITIVE_INFINITY};
    }
    return {elevation: c.codePointAt(0)! - "a".codePointAt(0)!, steps: Number.POSITIVE_INFINITY};
  }));

  const divs: HTMLDivElement[][] = [];
  for (let i = 0; i < elevations.length; i++) {
    const divline: HTMLDivElement[] = [];
    for (let j = 0; j < elevations[0].length; j++) {
      let newDiv = document.createElement("div");
      newDiv.style.top = (18 * i) + "px";
      newDiv.style.left = (18 * j) + "px";
      newDiv = document.body.appendChild(newDiv);
      divline.push(newDiv);
    }
    divs.push(divline);
  }

  let processList: {row: number, col: number}[] = findIndex2d(elevations, (v) => v.elevation === -1);

  function* doThing() {
    while(processList.length > 0) {
      let newProcesses: {row: number, col: number}[] = [];
      for (let p of processList) {
        const curTile = elevations[p.row][p.col];
        const newSteps = curTile.steps + 1;
        cardinals(elevations, p.row, p.col).forEach(v => {
          const cardinalTile = elevations[v.row][v.col];
          if (newSteps < cardinalTile.steps && curTile.elevation >= cardinalTile.elevation - 1) {
            cardinalTile.steps = newSteps;
            newProcesses.push({row: v.row, col: v.col});
          }
        });
      }
      processList = newProcesses;
      yield;
    }
  }

  const gen = doThing();

  function step() {
    paint(divs, elevations);
    const thing = gen.next();
    if (!thing.done) {
      for (let p of processList) {
        divs[p.row][p.col].style.background = "white";
      }
      setTimeout(() => step(), 10);
    } else {
      const end = findIndex2d(elevations, (v) => v.elevation === 26)[0];
      paintBlack(divs, elevations);
      setTimeout(() => followBack(new Set([end.row + "," + end.col])), 500);
    }
  }

  function followBack(stepsBack: Set<string>) {
    const nextSteps = new Set<string>();
    for (let s of stepsBack) {
      const [rs, cs] = s.split(",");
      const row = Number.parseInt(rs);
      const col = Number.parseInt(cs);
      divs[row][col].style.background = "hsl(" + elevations[row][col].steps + ", 100%, 50%)";
      for (let card of cardinals(elevations, row, col)) {
        if (elevations[card.row][card.col].steps === elevations[row][col].steps - 1 && elevations[card.row][card.col].elevation + 1 >= elevations[row][col].elevation) {
          nextSteps.add(card.row + "," + card.col);
        }
      }
    }
    if (nextSteps.size > 0) {
      setTimeout(() => followBack(nextSteps), 15);
    }
  }

  setTimeout(() => step(), 1000);  
}


function paint(divs: HTMLDivElement[][], elevations: {elevation: number, steps: number}[][]) {
  forEach2d(divs, (v, r, c) => {
    const elevationData = elevations[r][c];
    v.style.background = "hsl(" + elevationData.elevation * 310 / 26 + ", 100%, 50%)";
    if (elevationData.steps !== Number.POSITIVE_INFINITY) {
      v.textContent = "" + elevationData.steps;
    }
  });
}

function paintBlack(divs: HTMLDivElement[][], elevations: {elevation: number, steps: number}[][]) {
  forEach2d(divs, (v, r, c) => {
    const elevationData = elevations[r][c];
    v.style.background = "hsl(" + elevationData.elevation * 310 / 26 + ", 100%, 10%)";
  });
}