import { max, min } from "../../IterTools";
import { stepToward } from "../../stepToward";

function* part2(lines: string[]) {
  const dirs = lines.map(l => {
    const [dir, magstr] = l.split(" ");
    const steps = Number.parseInt(magstr)
    if (dir === "R") {
      return { x: 1, y: 0, steps: steps };
    }
    if (dir === "U") {
      return { x: 0, y: -1, steps: steps };
    }
    if (dir === "L") {
      return { x: -1, y: 0, steps: steps };
    }
    if (dir === "D") {
      return { x: 0, y: 1, steps: steps };
    }
    return { x: 0, y: 0, steps: 0 };
  });

  const visited: Set<string> = new Set();

  let rope: { x: number, y: number }[] = [];
  for (let i = 0; i < 10; i++) {
    rope.push({ x: 0, y: 0 });
  }

  visited.add("0,0");

  for (let v of dirs) {
    for (let i = 0; i < v.steps; i++) {
      rope[0].x += v.x;
      rope[0].y += v.y;

      for (let r = 1; r < rope.length; r++) {
        const curRope = rope[r];
        const aheadRope = rope[r - 1];

        if (Math.abs(aheadRope.x - curRope.x) >= 2 || Math.abs(rope[r - 1].y - rope[r].y) >= 2) {
          curRope.x = stepToward(curRope.x, aheadRope.x);
          curRope.y = stepToward(curRope.y, aheadRope.y);
        }
      }

      visited.add(rope[rope.length - 1].x + "," + rope[rope.length - 1].y);
      yield {visited, rope};
    }
  };
}

const divs: HTMLDivElement[][] = [];
for (let i = 0; i < 30; i++) {
  const divline: HTMLDivElement[] = [];
  for (let j = 0; j < 30; j++) {
    let newDiv = document.createElement("div");
    newDiv.className = "space";
    newDiv.style.top = (20 * i) + "px";
    newDiv.style.left = (20 * j) + "px";
    newDiv = document.body.appendChild(newDiv);
    divline.push(newDiv);
  }
  divs.push(divline);
}

fetch("src/2022/day09/input.txt").then(res => {
  res.text().then(t => {
    const gen = part2(t.split("\n"));

    function nextStep() {
      const upd = gen.next();
      if (upd.done) {
        return;
      }

      const {visited, rope} = upd.value;
      const justXs = rope.map(v => v.x);
      const justYs = rope.map(v => v.y);

      const leftmost = min(...justXs);
      const rightmost = max(...justXs);
      const topmost = min(...justYs);
      const bottommost = max(...justYs);

      const windowx = Math.floor((leftmost + rightmost) / 2) - 15;
      const windowy = Math.floor((topmost + bottommost) / 2) - 15;

      for (let y = 0; y < 30; y++) {
        for (let x = 0; x < 30; x++) {
          const curdiv = divs[y][x];
          curdiv.className = "space";
          if ((windowx + x) % 15 === 0 || (windowy + y) % 15 === 0) {
            curdiv.className = "delim";
          }
          if (visited.has((windowx + x) + "," + (windowy + y))) {
            curdiv.className = "visited"
          }
          
        }
      }

      for (let knot of rope) {
        divs[knot.y - windowy][knot.x - windowx].className = "rope";
      }

      divs[rope[0].y - windowy][rope[0].x - windowx].className = "head";

      setTimeout(() => {
        nextStep();
      }, 50);
    }

    setTimeout(() => {
      nextStep();
    }, 1000);
  });
});


