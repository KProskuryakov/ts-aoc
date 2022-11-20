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
