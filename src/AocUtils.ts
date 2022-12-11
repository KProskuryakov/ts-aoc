import { readFileSync } from "fs";
import { map } from "./IterTools";

export function linesFromFile(inFile: string) {
  return readFileSync(inFile, "utf-8").split("\n");
}

export function intsFromFile(inFile: string) {
  return map(linesFromFile(inFile), Number.parseInt);
}

export function parseCommaLineToInts(line: string): number[] {
  return line.split(",").map(v => parseInt(v));
}

export function parseCharsToInts(line: string): number[] {
  return Array.from(line).map(c => Number.parseInt(c));
}

export function stepToward(source: number, dest: number, step = 1) {
  if (dest > source) {
    return source + step;
  } else if (dest < source) {
    return source - step;
  }
  return source;
}