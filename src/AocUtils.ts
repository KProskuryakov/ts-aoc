import { readFileSync } from "fs";
import { map } from "./FuncUtils";

export function linesFromFile(inFile: string) {
    return readFileSync(inFile, "utf-8").split("\n");
}

export function intsFromFile(inFile: string) {
    return map(linesFromFile(inFile), Number.parseInt);
}