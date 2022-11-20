export function part1(bitStrings: string[]) {
  const half = bitStrings.length / 2;

  const finalInts = bitStrings
    .map(bitStringToInts)
    .reduce(sumArrays)

  const result = finalInts.map((v) => {if (v < half) return 0; else return 1; });
  const compResult = complementBitArray(result);

  return bitArrayToNum(result) * bitArrayToNum(compResult);
}

function bitStringToInts(str: string) {
  return Array.from(str).map((c) => Number.parseInt(c));
}

function sumArrays(as: number[], bs: number[]) {
  return as.map((v, i) => v + bs[i]);
}

function bitArrayToNum(nums: number[]) {
  return nums.reduceRight((p, c, i) => p + c * Math.pow(2, nums.length - i - 1));
}

function complementBitArray(nums: number[]) {
  return nums.map((v) => v == 1 ? 0 : 1);
}



export function part2(bitStrings: string[]) {
  const bitArrays = bitStrings.map(bitStringToInts);

  const r1 = commonRecurse(bitArrays, 0, mostCommonBit);
  const r2 = commonRecurse(bitArrays, 0, leastCommonBit);

  return bitArrayToNum(r1) * bitArrayToNum(r2);
}

function commonRecurse(bits: number[][], idx: number, commonFunc: (bits: number[][], idx: number) => number): number[] {
  if (bits.length === 1) {
    return bits[0];
  }
  const commonBit = commonFunc(bits, idx);
  const filtered = bits.filter((v) => v[idx] === commonBit);
  return commonRecurse(filtered, idx + 1, commonFunc);
}

function mostCommonBit(bits: number[][], idx: number) {
  if (bits.reduce((p, c) => p + c[idx], 0) >= bits.length / 2) {
    return 1;
  }
  return 0;
}

function leastCommonBit(bits: number[][], idx: number) {
  if (mostCommonBit(bits, idx) === 0) {
    return 1;
  }
  return 0;
}