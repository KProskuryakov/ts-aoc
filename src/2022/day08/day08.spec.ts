import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day08";

describe("2022-08", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2022/day08/smallinput.txt"))).to.equal(21);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2022/day08/input.txt"))).to.equal(1647);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input", () => {
      expect(part2(linesFromFile("src/2022/day08/smallinput.txt"))).to.equal(8);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2022/day08/input.txt"))).to.equal(392080);
    });
  });
});