import { split } from "../../ArrayTools";
import { product, range, zipIndex } from "../../IterTools";

type Monkey = {items: {val: number, element: HTMLDivElement}[], operator: string, opnumber: number, divisor: number, truetarget: number, falsetarget: number, inspections: number};

// @ts-ignore
import inputUrl from './input.txt'

// @ts-ignore
import monkeUrl from './monke.png'

fetch(inputUrl).then(res => {
  res.text().then(t => {
    code(t.split("\n"));
  })
});

function code(lines: string[]) {
  const monkeystrs = split(lines, "");

  const monkeyMap: Map<number, Monkey> = new Map();
  const monkeyIds: number[] = [];

  for (let monkeystr of monkeystrs) {
    const id = Number.parseInt(monkeystr[0].split(" ")[1][0]);
    const itemNums = monkeystr[1].split(": ")[1].split(", ").map(v => Number.parseInt(v));
    const items: {val: number, element: HTMLDivElement}[] = [];

    for (let [v, i] of zipIndex(itemNums)) {
      const itemElement = document.createElement("div");
      itemElement.textContent = "" + v;
      itemElement.style.background = "gray";
      itemElement.style.position = "absolute";
      itemElement.style.left = (90 + id * 175) + "px";
      itemElement.style.top = (470 - i * 25) + "px";
      itemElement.style.padding = "2px 5px"
      items.push({val: v, element: document.body.appendChild(itemElement)});
    }

    const [operator, numstr] = monkeystr[2].split("old ")[1].split(" ");
    const opnumber = numstr === "old" ? -1 : Number.parseInt(numstr);
    const divisor = Number.parseInt(monkeystr[3].split("by ")[1]);
    const truetarget = Number.parseInt(monkeystr[4].split("monkey ")[1]);
    const falsetarget = Number.parseInt(monkeystr[5].split("monkey ")[1]);
    monkeyMap.set(id, {items, operator, opnumber, divisor, truetarget, falsetarget, inspections: 0});
    monkeyIds.push(id);
  }

  const primeDivisor = product(Array.from(monkeyMap.values()).map(v => v.divisor));

  const monkeyXs: number[] = [];

  for (let m of monkeyIds) {
    const monkeyImg = document.createElement("img");
    monkeyImg.src = monkeUrl;
    monkeyImg.style.position = "absolute";
    monkeyImg.style.top = "500px";
    monkeyImg.style.left = (50 + m * 175) + "px";
    monkeyXs.push(50 + m * 175);
    document.body.appendChild(monkeyImg);
  }

  function* part2() {
    for (let _ of range(0, 10000)) {
      for (let id of monkeyIds) {
        const monkey = monkeyMap.get(id)!;
        while (monkey.items.length > 0) {
          let item = monkey.items.shift()!;
          monkey.inspections++;
          item.val %= primeDivisor;
          let num = monkey.opnumber === -1 ? item.val : monkey.opnumber;
          if (monkey.operator === "*") {
            item.val *= num;
          } else {
            item.val += num;
          }
          if (item.val % monkey.divisor === 0) {
            monkeyMap.get(monkey.truetarget)!.items.push(item);
            for (let [it, i] of zipIndex(monkeyMap.get(monkey.truetarget)!.items)) {
              it.element.style.left = (90 + monkey.truetarget * 175) + "px";
              it.element.style.top = (470 - (i) * 25) + "px";
              it.element.textContent = "" + it.val;
            }
          } else {
            monkeyMap.get(monkey.falsetarget)!.items.push(item);
            for (let [it, i] of zipIndex(monkeyMap.get(monkey.falsetarget)!.items)) {
              it.element.style.left = (90 + monkey.falsetarget * 175) + "px";
              it.element.style.top = (470 - (i) * 25) + "px";
              it.element.textContent = "" + it.val;
            }
          }
          for (let [it, i] of zipIndex(monkey.items)) {
            it.element.style.left = (90 + id * 175) + "px";
            it.element.style.top = (470 - (i) * 25) + "px";
            it.element.textContent = "" + it.val;
          }
          yield;
        }
      }
    }
  }
  const gen = part2();

  function step() {
    const nextstep = gen.next();
    if (nextstep.done){
      return;
    }
    setTimeout(() => {
      step();
    }, 50);
  }

  setTimeout(() => {
    step();
  }, 1000);
}
