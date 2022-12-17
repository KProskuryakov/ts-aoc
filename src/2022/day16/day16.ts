import { max } from "../../IterTools";
import { filter } from "../../MapTools";

type Node = {tunnels: Set<string>, ppm: number}

export function part1(lines: string[]) {
  const nodeMap = buildNodeMap(lines);
  const distMap = buildDistMap(nodeMap);

  return recurse("AA", nodeMap, distMap, new Set(), 30, 0);
}

function recurse(curLoc: string, nodeMap: Map<string, Node>, distMap: Map<string, Map<string, number>>, turned: Set<string>, timeRemaining: number, curScore: number): number {
  const dists = filter(distMap.get(curLoc)!, e => !turned.has(e[0]));
  if (timeRemaining > 0) {
    return max(curScore, ...Array.from(dists).map(e => {
      const newTurned = new Set(turned);
      newTurned.add(e[0]);
      const timeAfterMove = timeRemaining - e[1] - 1;
      const newScore = curScore + timeAfterMove * nodeMap.get(e[0])!.ppm;
      return recurse(e[0], nodeMap, distMap, newTurned, timeAfterMove, newScore);
    }));
  }
  return curScore;
}

function buildNodeMap(lines: string[]): Map<string, Node> {
  return new Map<string, Node>(lines.map(l => {
    const [left, right] = l.split("; ");
    const ppm = Number.parseInt(left.split("=")[1]);
    const name = left.split(" ")[1];
    let tunnels: Set<string> = new Set();
    if (right.includes("valves")) {
      tunnels = new Set(right.split("valves ")[1].split(", "));
    } else {
      tunnels = new Set(right.split("valve ")[1].split(", "));
    }
    return [name, {tunnels, valveTurned: false, ppm}];
  }));
}

function buildDistMap(nodeMap: Map<string, Node>) {
  const validNodes = filter(nodeMap, (e) => e[1].ppm > 0);

  const validStarts = Array.from(validNodes.keys());
  validStarts.push("AA");

  return new Map(validStarts.map(n => [n, calcDists(n,  nodeMap, validNodes)]));
}

function calcDists(start: string, nodeMap: Map<string, Node>, validNodeMap: Map<string, Node>) {
  const distances = new Map(Array.from(nodeMap.keys()).map(n => [n, Number.POSITIVE_INFINITY]));
  distances.set(start, 0);
  const queue: string[] = [start];
  while (queue.length > 0) {
    const cur = queue.pop()!;
    const newDist = distances.get(cur)! + 1;
    for (let node of nodeMap.get(cur)!.tunnels) {
      if (newDist < distances.get(node)!) {
        distances.set(node, newDist);
        queue.unshift(node);
      }
    }
  }

  return filter(distances, (([name, ]) => name !== start && validNodeMap.has(name)));
}

export function part2(lines: string[]) {
  const nodeMap = buildNodeMap(lines);
  const distMap = buildDistMap(nodeMap);

  const size = Math.pow(2, distMap.size - 1);
  const mask = new Uint16Array(size);

  const indexMap: Map<string, number> = new Map(Array.from(distMap.keys()).filter(v => v !== "AA").map((v, i) => [v, i]));

  recurse2("AA", nodeMap, distMap, new Set(), 26, 0, mask, indexMap);

  let result = 0;

  for (let i = 0; i < size; i++) {
    const comp = size - i - 1;
    if (mask[i] + mask[comp] > result) {
      result = mask[i] + mask[comp];
    }
  }

  return result;
}

function toMask(turned: Set<string>, indexMap: Map<string, number>): number {
  let res = 0;

  for (let t of turned) {
    res += Math.pow(2, indexMap.get(t)!);
  }

  return res;
}

function fillMask(mask: Uint16Array, maskspot: number, newScore: number) {
  for (let i = 0; i < mask.length; i++) {
    if ((i & maskspot) === maskspot) {
      mask[i] = Math.max(newScore, mask[i]);
    }
  }
}

function recurse2(curLoc: string, nodeMap: Map<string, Node>, distMap: Map<string, Map<string, number>>, turned: Set<string>, timeRemaining: number, curScore: number, mask: Uint16Array, indexMap: Map<string, number>) {
  const dists = filter(distMap.get(curLoc)!, e => !turned.has(e[0]) && e[0] !== "AA");
  Array.from(dists).forEach(e => {
    const newTurned = new Set(turned);
    newTurned.add(e[0]);
    const timeAfterMove = timeRemaining - e[1] - 1;
    let newScore = curScore + timeAfterMove * nodeMap.get(e[0])!.ppm;
    if (timeAfterMove <= 0) {
      return;
    }
    const maskspot = toMask(newTurned, indexMap);
    fillMask(mask, maskspot, newScore);
    recurse2(e[0], nodeMap, distMap, newTurned, timeAfterMove, newScore, mask, indexMap);
  });
}
