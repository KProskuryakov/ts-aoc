import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day02";

describe("2022-02", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2022/day02/smallinput.txt"))).to.equal(15);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2022/day02/input.txt"))).to.equal(10404);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input", () => {
      expect(part2(linesFromFile("src/2022/day02/smallinput.txt"))).to.equal(12);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2022/day02/input.txt"))).to.equal(10334);
    });
  });
});