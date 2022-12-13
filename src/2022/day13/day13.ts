import { split } from "../../ArrayTools";
import { zip2longest, zipIndex } from "../../IterTools";

export function part1(lines: string[]) {
  const splits = split(lines, "");
  let finalSum = 0;
  for (let [[first, second], i] of zipIndex(splits)) {
    const firstList = stringToList(first);
    const secondList = stringToList(second);

    if (compare(firstList, secondList) === "right") {
      finalSum += i + 1;
    }
  }
  return finalSum;
}

type List = {values: (number | List)[], parent: List | undefined};

function stringToList(line: string): List {
  let cur: List | undefined = undefined;
  let chars = "";
  for(let c of Array.from(line)) {
    if (c === "[") {
      if (cur === undefined) {
        cur = {values: [], parent: undefined};
      } else {
        const newList: List = {values: [], parent: cur};
        cur.values.push(newList);
        cur = newList;
      }
    } else if (c === "]") {
      if (chars.length > 0) {
        cur!.values.push(Number.parseInt(chars));
        chars = "";
      }
      if (cur!.parent === undefined) {
        return cur!;
      } else {
        cur = cur!.parent!;
      }
    } else if (c === ",") {
      if (chars.length > 0) {
        cur!.values.push(Number.parseInt(chars));
        chars = "";
      }
    } else {
      chars = chars + c;
    }
  }
  return cur!;
}

type CompareStatus = "right" | "wrong" | "continue";

function compare(a: List | number, b: List | number): CompareStatus {
  if (typeof(a) === "number" && typeof(b) === "number") {
    if (a < b) {
      return "right";
    } else if (a > b) {
      return "wrong";
    } else {
      return "continue";
    }
  }
  if (typeof(a) === "number") {
    return compare({values: [a], parent: undefined}, b)
  }
  if (typeof(b) === "number") {
    return compare(a, {values: [b], parent: undefined})
  }
  const zipped = Array.from(zip2longest(a.values, b.values, undefined, undefined));
  for (let [i, j] of zipped) {
    if (j === undefined) {
      return "wrong";
    } else if (i === undefined) {
      return "right";
    } else {
      const result = compare(i, j);
      if (result === "continue") {
        continue;
      }
      return result;
    }
  }
  return "continue";
}

export function part2(lines: string[]) {
  const lists = lines.filter(s => s !== "").map(l => stringToList(l));
  const div1 = stringToList("[[2]]");
  const div2 = stringToList("[[6]]");
  
  lists.push(div1);
  lists.push(div2);

  lists.sort((a, b) => compare(a, b) === "right" ? -1 : 1);

  const div1Index = lists.indexOf(div1) + 1;
  const div2Index = lists.indexOf(div2) + 1;

  return div1Index * div2Index;
}