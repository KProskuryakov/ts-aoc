import { filter } from "./IterTools";

export function subtract<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set(filter(a, (v) => !b.has(v)));
}

export function add<T>(...sets: Set<T>[]): Set<T> {
  const res = new Set<T>();
  sets.forEach((set) => (set.forEach((v) => res.add(v))));
  return res;
}