import { sum } from "../../IterTools"

type File = {
  name: string
  size: number
}
type Dir = {
  name: string
  files: File[]
  subdirs: Map<string, Dir>
  parent: Dir | undefined
}

export function part1(lines: string[]) {
  const root = generateFileTree(lines);
  const sizes: number[] = [];
  getSizes(root, sizes);

  return sum(sizes.filter(v => v <= 100000));
}

function getSizes(node: Dir, sizes: number[]): number {
  let curSize = sum(node.files.map(f => f.size));
  for (let subdir of node.subdirs.values()) {
    curSize += getSizes(subdir, sizes);
  }
  sizes.push(curSize);
  return curSize;
}

function generateFileTree(lines: string[]): Dir {
  const root: Dir = {name: "/", files: [], subdirs: new Map(), parent: undefined};
  let curNode: Dir = root;
  for (let line of lines) {
    if (line === "$ cd /" || line === "$ ls") {
      continue;
    }
    if (line === "$ cd ..") { // go up a dir
      curNode = curNode.parent!;
    } else if (line.startsWith("$ cd")) { // go down into dir
      const dest = line.split(" ")[2];
      curNode = curNode.subdirs.get(dest)!;
    } else if (line.startsWith("dir")) { // add dir to list
      const dirname = line.split(" ")[1];
      curNode.subdirs.set(dirname, {name: dirname, files: [], subdirs: new Map(), parent: curNode});
    } else { // add file to list
      const [size, fname] = line.split(" ");
      curNode.files.push({name: fname, size: Number.parseInt(size)});
    }
  }
  return root;
}

export function part2(lines: string[]) {
  const root = generateFileTree(lines);
  const sizes: number[] = [];
  const rootsize = getSizes(root, sizes);

  const minspace = rootsize - 40000000;

  const validsizes = sizes.filter(s => s >= minspace).sort((a, b) => a - b);
  
  return validsizes[0];
}