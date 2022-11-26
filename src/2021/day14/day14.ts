import { groupby, pair, slice } from "../../ArrayTools";
import { max, min, range, zip2, zip2longest } from "../../IterTools";
import { increment } from "../../MapTools";

export function part1(lines: string[]) {
  let template = Array.from(lines[0]);
  const ruleStrings = slice(lines, 2);
  
  const rules = new Map(ruleStrings.map(v => {
    const split = v.split(" -> ");
    return pair(split);
  }));

  for (let i of range(0, 10)) {
    template = Array.from(zip2longest(slice(template, 0), slice(template, 1), "", "")).flatMap(([fst, snd]) => {
      const newchar = rules.get(fst + snd);
      if (newchar) {
        return [fst, newchar];
      } else {
        return [fst];
      }
    });
  }

  template.sort();
  const lengths = groupby(template).map(v => v.length);
  return max(...lengths) - min(...lengths)
}

export function part2(lines: string[]) {
  let template = Array.from(lines[0]);
  const ruleStrings = slice(lines, 2);
  
  const rules = new Map(ruleStrings.map(v => {
    const split = v.split(" -> ");
    return pair(split);
  }));

  let counts = new Map<string, number>();
  for(let p of zip2(slice(template, 0, -1), slice(template, 1))) {
    increment(counts, p[0] + p[1]);
  }

  for (let i of range(0, 40)) {
    let newcounts = new Map<string, number>();
    for (let p of counts.keys()) {
      increment(newcounts, p[0] + rules.get(p)!, counts.get(p)!)
      increment(newcounts, rules.get(p)! + p[1], counts.get(p)!)
    }
    counts = newcounts;
  }

  let charcounts = new Map<string, number>();
  for (let [cc, val] of counts.entries()) {
    increment(charcounts, cc[0], val);
    increment(charcounts, cc[1], val);
  }
  
  const lengths = Array.from(charcounts.values()).map(v => Math.ceil(v / 2));
  return max(...lengths) - min(...lengths);
}