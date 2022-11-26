export function increment<K>(map: Map<K, number>, key: K, val = 1) {
  const cur = map.get(key);
  if (cur) {
    map.set(key, cur + val);
  } else {
    map.set(key, val);
  }
}