type Pair<A, B> = [A, B]

export function* zip2<A, B>(a: Iterable<A>, b: Iterable<B>): Generator<Pair<A, B>> {
  let ai = iter(a);
  let bi = iter(b);
  let res1 = ai.next();
  let res2 = bi.next();
  while (!res1.done && !res2.done) {
    yield [res1.value, res2.value];
  }
}

export function iter<A>(i: Iterable<A>): Iterator<A> {
  return i[Symbol.iterator]();
}

// end - start = number of elements sliced
export function* slice<A>(a: A[], start: number, end?: number): Generator<A> {
  if (start < 0) start = max(0, a.length + start);
  if (start >= a.length) start = a.length - 1;
  if (end && end < 0) end = max(0, a.length + end);
  if (end === undefined || end > a.length) end = a.length;
  let cur = start;
  while (cur !== end) {
    yield a[cur];
    cur += cur < end ? 1 : -1;
  }
}

export function max(a: number, ...rest: number[]): number {
  return reduce(rest, a, (c, n) => { return c > n ? c : n });
}

export function min(a: number, ...rest: number[]): number {
  return reduce(rest, a, (c, n) => { return c < n ? c : n });
}

export function reduce<I, R>(iter: Iterable<I>, start: R, func: (cur: R, next: I) => R): R {
  let final = start;
  for (const i of iter) {
    final = func(final, i);
  }
  return final;
}
