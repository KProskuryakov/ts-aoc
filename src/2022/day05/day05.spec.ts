import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day05";

describe("2022-05", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2022/day05/smallinput.txt"))).to.equal("CMZ");
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2022/day05/input.txt"))).to.equal("VWLCWGSDQ");
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input", () => {
      expect(part2(linesFromFile("src/2022/day05/smallinput.txt"))).to.equal("MCD");
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2022/day05/input.txt"))).to.equal("TCGLQSLPW");
    });
  });
});