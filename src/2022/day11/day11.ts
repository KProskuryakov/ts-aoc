import { slice, split } from "../../ArrayTools";
import { product, range } from "../../IterTools";

type Monkey = {items: number[], operator: string, opnumber: number, divisor: number, truetarget: string, falsetarget: string, inspections: number};

export function part1(lines: string[]) {
  const monkeystrs = split(lines, "");

  const monkeyMap: Map<string, Monkey> = new Map();
  const monkeyIds: string[] = [];

  for (let monkeystr of monkeystrs) {
    const id = monkeystr[0].split(" ")[1][0];
    const items = monkeystr[1].split(": ")[1].split(", ").map(v => Number.parseInt(v));
    const [operator, numstr] = monkeystr[2].split("old ")[1].split(" ");
    const opnumber = numstr === "old" ? -1 : Number.parseInt(numstr);
    const divisor = Number.parseInt(monkeystr[3].split("by ")[1]);
    const truetarget = monkeystr[4].split("monkey ")[1];
    const falsetarget = monkeystr[5].split("monkey ")[1];
    monkeyMap.set(id, {items, operator, opnumber, divisor, truetarget, falsetarget, inspections: 0});
    monkeyIds.push(id);
  }

  for (let _ of range(0, 20)) {
    for (let id of monkeyIds) {
      const monkey = monkeyMap.get(id)!;
      while (monkey.items.length > 0) {
        let item = monkey.items.shift()!;
        monkey.inspections++;
        let num = monkey.opnumber === -1 ? item : monkey.opnumber;
        if (monkey.operator === "*") {
          item *= num;
        } else {
          item += num;
        }
        item = Math.floor(item / 3);
        if (item % monkey.divisor === 0) {
          monkeyMap.get(monkey.truetarget)!.items.push(item);
        } else {
          monkeyMap.get(monkey.falsetarget)!.items.push(item);
        }
      }
    }
  }

  return product(slice(Array.from(monkeyMap.values()).map(v => v.inspections).sort((a, b) => b - a), 0, 2));
}

export function part2(lines: string[]) {
  const monkeystrs = split(lines, "");

  const monkeyMap: Map<string, Monkey> = new Map();
  const monkeyIds: string[] = [];

  for (let monkeystr of monkeystrs) {
    const id = monkeystr[0].split(" ")[1][0];
    const items = monkeystr[1].split(": ")[1].split(", ").map(v => Number.parseInt(v));
    const [operator, numstr] = monkeystr[2].split("old ")[1].split(" ");
    const opnumber = numstr === "old" ? -1 : Number.parseInt(numstr);
    const divisor = Number.parseInt(monkeystr[3].split("by ")[1]);
    const truetarget = monkeystr[4].split("monkey ")[1];
    const falsetarget = monkeystr[5].split("monkey ")[1];
    monkeyMap.set(id, {items, operator, opnumber, divisor, truetarget, falsetarget, inspections: 0});
    monkeyIds.push(id);
  }

  const primeDivisor = product(Array.from(monkeyMap.values()).map(v => v.divisor))

  for (let _ of range(0, 10000)) {
    for (let id of monkeyIds) {
      const monkey = monkeyMap.get(id)!;
      while (monkey.items.length > 0) {
        let item = monkey.items.shift()!;
        monkey.inspections++;
        item %= primeDivisor;
        let num = monkey.opnumber === -1 ? item : monkey.opnumber;
        if (monkey.operator === "*") {
          item *= num;
        } else {
          item += num;
        }
        if (item % monkey.divisor === 0) {
          monkeyMap.get(monkey.truetarget)!.items.push(item);
        } else {
          monkeyMap.get(monkey.falsetarget)!.items.push(item);
        }
      }
    }
  }

  return product(slice(Array.from(monkeyMap.values()).map(v => v.inspections).sort((a, b) => b - a), 0, 2));
}