import { stepToward } from "../../AocUtils";

export function part1(lines: string[]) {
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

  let headx = 0;
  let heady = 0;

  let tailx = 0;
  let taily = 0;

  visited.add(tailx + "," + taily);

  dirs.forEach(v => {
    for (let i = 0; i < v.steps; i++) {
      headx += v.x;
      heady += v.y;

      if (Math.abs(headx - tailx) >= 2 || Math.abs(heady - taily) >= 2) {
        if (Math.abs(headx - tailx) === 1) {
          tailx += headx - tailx;
        } else if (Math.abs(heady - taily) === 1) {
          taily += heady - taily;
        }
        tailx += v.x;
        taily += v.y;

        visited.add(tailx + "," + taily);
      }
    }
  });

  return visited.size;
}

export function part2(lines: string[]) {
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

  let rope: {x: number, y: number}[] = [];
  for (let i = 0; i < 10; i++) {
    rope.push({x: 0, y: 0});
  }

  visited.add("0,0");

  dirs.forEach(v => {
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
    }
  });

  return visited.size;
}