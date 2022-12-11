import { groupby } from "../../ArrayTools";
import { range, sum } from "../../IterTools";

export function part1(lines: string[]) {
  let signalstrength = 1;
  const signals = lines.flatMap(op => {
    if (op === "noop") {
      return [signalstrength];
    } else {
      const add = Number.parseInt(op.split(" ")[1]);
      const prev = signalstrength;
      signalstrength += add;
      return [prev, prev];
    }
  });

  return sum(Array.from(range(19, 220, 40, true)).map(i => signals[i] * (i + 1)));
}

export function part2(lines: string[]) {
  let signalstrength = 1;
  const signals = lines.flatMap(op => {
    if (op === "noop") {
      return [signalstrength];
    } else {
      const add = Number.parseInt(op.split(" ")[1]);
      const prev = signalstrength;
      signalstrength += add;
      return [prev, prev];
    }
  });

  const chars = signals.map((v, i) => {
    if (Math.abs(i - v - (Math.floor(i / 40) * 40)) <= 1) {
      return "#";
    }
    return " ";
  });

  const charlines = groupby(chars, (v, i) => Math.floor(i / 40));
  for (let line of charlines) {
    console.log(line.join(""));
  }

  return chars.filter(v => v === "#").length;
}