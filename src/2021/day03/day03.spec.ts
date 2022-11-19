import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day03";

describe("2021-03", () => {
  describe("part 1", () => {
    it("does the thing with the small sample", () => {
      const smallSample = ["00100", "11110", "10110", "10111", 
          "10101", "01111", "00111", "11100", "10000", "11001", "00010", "01010"];
      expect(part1(smallSample)).to.equal(198);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2021/day03/input.txt"))).to.equal(693486);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small sample", () => {
      const smallSample = ["00100", "11110", "10110", "10111", 
          "10101", "01111", "00111", "11100", "10000", "11001", "00010", "01010"];
      expect(part2(smallSample)).to.equal(230);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2021/day03/input.txt"))).to.equal(3379326);
    });
  });
});