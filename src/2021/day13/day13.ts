import { max, range, reduce } from "../../IterTools";

export function part1(lines: string[]): number {
  const coords = lines.flatMap(line => {
    if (line.includes(",")) {
      const splits = line.split(",");
      return [splits.map(v => Number.parseInt(v))];
    }
    return [];
  });

  const folds = lines.flatMap(line => {
    if (line.includes("=")) {
      const splits = line.split("=");
      return [{dir: splits[0].charAt(splits[0].length - 1), val: Number.parseInt(splits[1])}]
    }
    return [];
  });

  return new Set(coords.map(v => {
    for (let f of folds) {
      if (f.dir === "x" && v[0] > f.val) {
        v[0] = f.val - (v[0] - f.val);
      } else if (f.dir === "y" && v[1] > f.val) { // dir is y
        v[1] = f.val - (v[1] - f.val);
      }
      break; // only follow first instruction :^)
    }
    return v.join(",");
  })).size;
}

export function part2(lines: string[]) {
  const coords = lines.flatMap(line => {
    if (line.includes(",")) {
      const splits = line.split(",");
      return [splits.map(v => Number.parseInt(v))];
    }
    return [];
  });

  const folds = lines.flatMap(line => {
    if (line.includes("=")) {
      const splits = line.split("=");
      return [{dir: splits[0].charAt(splits[0].length - 1), val: Number.parseInt(splits[1])}]
    }
    return [];
  });

  const afterFoldSet = new Set(coords.map(v => {
    for (let f of folds) {
      if (f.dir === "x" && v[0] > f.val) {
        v[0] = f.val - (v[0] - f.val);
      } else if (f.dir === "y" && v[1] > f.val) { // dir is y
        v[1] = f.val - (v[1] - f.val);
      }
    }
    return v.join(",");
  }));

  const width = reduce(afterFoldSet, 0, (c, n) => max(c, Number.parseInt(n.split(",")[0]))) + 1;
  const height = reduce(afterFoldSet, 0, (c, n) => max(c, Number.parseInt(n.split(",")[1]))) + 1;

  for (let y of range(0, height)) {
    let output: string[] = [];
    for (let x of range(0, width)) {
      if (afterFoldSet.has([x, y].join(","))) {
        output.push("X");
      } else {
        output.push(" ");
      }
    }
    console.log(output.join(""));
  }

  return afterFoldSet.size;
}
