export function groupby<T>(arr: T[], key?: (value: T, index: number, arr: T[]) => any): T[][] {
  if (arr.length === 0) {
    return [];
  }

  if (key === undefined) {
    key = (v) => v;
  }

  const result: T[][] = [];
  let accum: T[] = [];
  let cur_key = undefined;

  for (let i = 0; i < arr.length; i++) {
    const k = key(arr[i], i, arr);
    if (cur_key !== k) {
      cur_key = k;
      if (accum.length > 0) {
        result.push(accum);
        accum = [];
      }
    }
    accum.push(arr[i]);
  }

  if (accum.length > 0) {
    result.push(accum);
  }

  return result;
}

export function slice<T>(a: T[], start: number, end?: number, step = 1): T[] {
  if (start < 0) start = Math.max(0, a.length + start);
  if (start > a.length) start = a.length;
  if (end && end < 0) end = Math.max(0, a.length + end);
  if (end === undefined || end > a.length) end = a.length;
  let reverse = false;
  if (start > end) { // reverse slice
    start--;
    end--;
    reverse = true;
  }
  let cur = start;
  const result: T[] = [];
  while (!reverse && cur < end || reverse && cur > end) {
    result.push(a[cur]);
    cur += cur < end ? 1 * step : -1 * step;
  }
  return result;
}

export function getDefault<T>(arr: T[] | undefined, idx: number, defaultValue: T) {
  if (arr === undefined || idx < 0 || idx >= arr.length) {
    return defaultValue;
  }
  return arr[idx];
}

export function map2d<T, U>(arr: T[][], mapfunc: (val: T, row: number, col: number, arr: T[][]) => U): U[][] {
  return arr.map((line, row) => line.map((v, col) => mapfunc(v, row, col, arr)));
}

export function reduce2d<T, U>(arr: T[][], initial_value: U, reducefunc: (prev: U, cur: T, row: number, col: number, arr: T[][]) => U): U {
  let result = initial_value;
  arr.forEach((line, row) => line.forEach((v, col) => {
    result = reducefunc(result, v, row, col, arr);
  }));
  return result;
}

export function any2d<T>(arr: T[][], condition: (val: T, row: number, col: number, arr: T[][]) => boolean): boolean {
  return reduce2d(arr, false, (prev, cur, row, col) => prev || condition(cur, row, col, arr));
}

export function all2d<T>(arr: T[][], condition: (val: T, row: number, col: number, arr: T[][]) => boolean): boolean {
  return reduce2d(arr, true, (prev, cur, row, col) => prev && condition(cur, row, col, arr));
}

export function forEach2d<T>(arr: T[][], func: (val: T, row: number, col: number, arr: T[][]) => void): void {
  arr.forEach((line, row) => line.forEach((v, col) => {
    func(v, row, col, arr);
  }));
}

export function set2d<T>(arr: T[][], row: number, col: number, val: T): void {
  if (row >= arr.length || row < 0) return;
  const line = arr[row];
  if (col >= line.length || col < 0) return;
  line[col] = val;
}

export function update2d<T>(arr: T[][], row: number, col: number, updatefunc: (val: T, row: number, col: number, arr: T[][]) => T): void {
  if (row >= arr.length || row < 0) return;
  const line = arr[row];
  if (col >= line.length || col < 0) return;
  line[col] = updatefunc(line[col], row, col, arr);
}

export function findIndex2d<T>(arr: T[][], predicate: (val: T, row: number, col: number, arr: T[][]) => boolean): {row: number, col: number}[] {
  const found: {row: number, col: number}[] = [];
  forEach2d(arr, (v, r, c, a) => {
    if (predicate(v, r, c, a)) {
      found.push({row: r, col: c});
    }
  });
  return found;
}

export function surrounds<T>(arr: T[][], row: number, col: number, updatefunc: (val: T, row: number, col: number, arr: T[][]) => T): void {
  const range = [-1, 0, 1];
  for (let r of range) {
    for (let c of range) {
      if (r !== 0 || c !== 0) {
        update2d(arr, row + r, col + c, updatefunc);
      }
    }
  }
}

export function cardinals<T>(arr: T[][], row: number, col: number): {row: number, col: number}[] {
  const cards = [{row: row + 1, col: col}, {row: row - 1, col: col}, {row: row, col: col + 1}, {row: row, col: col - 1}];
  return cards.filter((v) => valid2d(arr, v.row, v.col));
}

export function valid2d<T>(arr: T[][], row: number, col: number): boolean {
  return row >= 0 && row < arr.length && col >= 0 && col < arr[row].length;
}

export function pair<T>(arr: T[]): [T, T] {
  return [arr[0], arr[1]];
}

export function split<T>(arr: T[], on: T): T[][] {
  return groupby(arr, v => v !== on).filter(v => getDefault(v, 0, on) !== on);
}