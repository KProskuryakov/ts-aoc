import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day10";

describe("2021-10", () => {
  describe("part 1", () => {
    it("does the thing with the small sample", () => {
      expect(part1(linesFromFile("src/2021/day10/smallinput.txt"))).to.equal(26397);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2021/day10/input.txt"))).to.equal(266301);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small sample", () => {
      expect(part2(linesFromFile("src/2021/day10/smallinput.txt"))).to.equal(288957);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2021/day10/input.txt"))).to.equal(3404870164);
    });
  });
});