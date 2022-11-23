import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day11";

describe("2021-11", () => {
  describe("part 1", () => {
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2021/day11/input.txt"))).to.equal(266301);
    });
  });
  describe("part 2", () => {
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2021/day11/input.txt"))).to.equal(3404870164);
    });
  });
});