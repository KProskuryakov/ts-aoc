
export function stepToward(source: number, dest: number, step = 1) {
  if (dest > source) {
    return source + step;
  } else if (dest < source) {
    return source - step;
  }
  return source;
}
