import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day04";

describe("2022-04", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2022/day04/smallinput.txt"))).to.equal(2);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2022/day04/input.txt"))).to.equal(462);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input", () => {
      expect(part2(linesFromFile("src/2022/day04/smallinput.txt"))).to.equal(4);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2022/day04/input.txt"))).to.equal(835);
    });
  });
});