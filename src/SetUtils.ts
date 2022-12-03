import { filter } from "./IterTools";

export function subtract<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set(filter(a, (v) => !b.has(v)));
}

export function union<T>(...sets: Set<T>[]): Set<T> {
  const res = new Set<T>();
  sets.forEach((set) => (set.forEach((v) => res.add(v))));
  return res;
}

export function intersect<T>(a: Set<T>, b: Set<T>): Set<T> {
  const res = new Set<T>(a);
  for (let i of res) {
    if (!b.has(i)) {
      res.delete(i);
    }
  }
  return res;
}