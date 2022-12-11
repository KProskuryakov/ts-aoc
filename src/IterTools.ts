export function zip2<A, B>(a: Iterable<A>, b: Iterable<B>): Generator<[A, B]> {
  return map2(a, b, (a, b) => [a, b]);
}

export function zip2longest<A, B>(a: Iterable<A>, b: Iterable<B>, defaultA: A, defaultB: B): Generator<[A, B]> {
  return map2longest(a, b, defaultA, defaultB, (a, b) => [a, b]);
}

export function iter<A>(i: Iterable<A>): Iterator<A> {
  return i[Symbol.iterator]();
}

// end - start = number of elements sliced
export function* slice<A>(a: A[], start: number, end?: number): Generator<A> {
  if (start < 0) start = max(0, a.length + start);
  if (start > a.length) start = a.length;
  if (end && end < 0) end = max(0, a.length + end);
  if (end === undefined || end > a.length) end = a.length;
  if (start > end) { // reverse slice
    start--;
    end--;
  }
  let cur = start;
  while (cur !== end) {
    yield a[cur];
    cur += cur < end ? 1 : -1;
  }
}

export function max(...rest: number[]): number {
  return reduce(rest, Number.NEGATIVE_INFINITY, (c, n) => { return c > n ? c : n });
}

export function min(...rest: number[]): number {
  return reduce(rest, Number.POSITIVE_INFINITY, (c, n) => { return c < n ? c : n });
}

export function* map<I, R>(iter: Iterable<I>, func: (input: I) => R): Generator<R> {
  for (let item of iter) {
    yield func(item);
  }
}

export function* map2<I, J, R>(iter1: Iterable<I>, iter2: Iterable<J>, func: (input1: I, input2: J) => R): Generator<R> {
  let ai = iter(iter1);
  let bi = iter(iter2);
  let res1 = ai.next();
  let res2 = bi.next();
  while (!res1.done && !res2.done) {
    yield func(res1.value, res2.value);
    res1 = ai.next();
    res2 = bi.next();
  }
}

export function* map2longest<I, J, R>(iter1: Iterable<I>, iter2: Iterable<J>, default1: I, default2: J, func: (input1: I, input2: J) => R): Generator<R> {
  let ai = iter(iter1);
  let bi = iter(iter2);
  let res1 = ai.next();
  let res2 = bi.next();
  while (!res1.done || !res2.done) {
    if (!res1.done && !res2.done) {
      yield func(res1.value, res2.value);
      res1 = ai.next();
      res2 = bi.next();
    } else if (res2.done) {
      yield func(res1.value, default2);
      res1 = ai.next();
    } else if (res1.done) {
      yield func(default1, res2.value);
      res2 = bi.next();
    }
  }
}

export function* mapArray<I, R>(iterables: Iterable<Iterable<I>>, func: (inputs: Iterable<I>) => R): Generator<R> {
  const iterators = Array.from(map(iterables, iter));
  let results = Array.from(map(iterators, (i) => i.next()));
  while (all(map(results, (r) => !r.done))) {
    yield func(map(results, (r) => r.value));
    results = Array.from(map(iterators, (i) => i.next()));
  }
}

export function all(iter: Iterable<boolean>): boolean {
  // TODO make this short circuit
  return reduce(iter, true, (c, n) => c && n);
}

export function any(iter: Iterable<boolean>): boolean {
  // TODO make this short circuit
  return reduce(iter, false, (c, n) => c || n);
}

export function* filter<I>(iter: Iterable<I>, func: (input: I) => boolean): Generator<I> {
  for (let item of iter) {
    if (func(item)) {
      yield item;
    }
  }
}

export function reduce<I, R>(iter: Iterable<I>, start: R, func: (cur: R, next: I) => R): R {
  let final = start;
  for (const i of iter) {
    final = func(final, i);
  }
  return final;
}

export function sum(iterable: Iterable<number>) {
  return reduce(iterable, 0, (c, n) => c + n);
}

export function product(iterable: Iterable<number>) {
  return reduce(iterable, 1, (c, n) => c * n);
}

export function* accum<I, R>(iterable: Iterable<I>, start: R, func: (cur: R, next: I) => R): Generator<R> {
  let final = start;
  for (const i of iterable) {
    final = func(final, i);
    yield final
  }
  yield final;
}

export function* range(start: number, end?: number, step = 1, inclusive = false) {
  if (end === undefined) end = Infinity;
  if (end < start) {
    if (inclusive) {
      end--;
    }
    for (let i = start; i > end; i -= step) {
      yield i;
    }
  } else {
    if (inclusive) {
      end++;
    }
    for (let i = start; i < end; i += step) {
      yield i;
    }
  }
}

export function zipIndex<I>(iterable: Iterable<I>) {
  return zip2(iterable, range(0));
}