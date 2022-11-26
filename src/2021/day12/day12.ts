import { sum } from "../../IterTools";

class Node {
  name: string;
  adjNodes: Map<string, Node> = new Map();
  small: boolean;

  constructor(name: string) {
    this.name = name;
    this.small = name === name.toLowerCase();
  }

  addNode(otherNode: Node) {
    this.adjNodes.set(otherNode.name, otherNode);
    otherNode.adjNodes.set(this.name, this);
  }
}

export function part1(lines: string[]) {
  const nodes = new Map<string, Node>();

  lines.forEach(line => {
    const [node1name, node2name] = line.split("-");

    let node1 = nodes.get(node1name);
    if (node1 === undefined) {
      node1 = new Node(node1name)
      nodes.set(node1name, node1);
    }

    let node2 = nodes.get(node2name);
    if (node2 === undefined) {
      node2 = new Node(node2name)
      nodes.set(node2name, node2);
    }

    node1.addNode(node2);
  });

  return crawl(nodes.get("start")!, new Set());
}

function crawl(curNode: Node, visited: Set<string>): number {
  if (curNode.name === "end") {
    return 1;
  }

  if (curNode.small) {
    visited.add(curNode.name);
  }

  let nodesToVisit: Node[] = [];
  for (let [name, node] of curNode.adjNodes) {
    if (!visited.has(name)) {
      nodesToVisit.push(node);
    }
  }

  return sum(nodesToVisit.map((n) => crawl(n, new Set(visited))));
}


export function part2(lines: string[]) {
  const nodes = new Map<string, Node>();

  lines.forEach(line => {
    const [node1name, node2name] = line.split("-");

    let node1 = nodes.get(node1name);
    if (node1 === undefined) {
      node1 = new Node(node1name)
      nodes.set(node1name, node1);
    }

    let node2 = nodes.get(node2name);
    if (node2 === undefined) {
      node2 = new Node(node2name)
      nodes.set(node2name, node2);
    }

    node1.addNode(node2);
  });

  return crawl2(nodes.get("start")!, new Set(), false);
}

function crawl2(curNode: Node, visited: Set<string>, visitedTwice: boolean): number {
  if (curNode.name === "end") {
    return 1;
  }

  if (visited.has(curNode.name)) {
    visitedTwice = true;
  }

  if (curNode.small) {
    visited.add(curNode.name);
  }

  let nodesToVisit: Node[] = [];
  for (let [name, node] of curNode.adjNodes) {
    if (!visited.has(name)) {
      nodesToVisit.push(node);
    } else if (!visitedTwice && name !== "start") {
      nodesToVisit.push(node);
    }
  }

  return sum(nodesToVisit.map((n) => crawl2(n, new Set(visited), visitedTwice)));
}