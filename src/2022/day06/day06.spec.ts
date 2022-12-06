import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day06";

describe("2022-06", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2022/day06/smallinput.txt"))).to.equal(7);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2022/day06/input.txt"))).to.equal(1920);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input", () => {
      expect(part2(linesFromFile("src/2022/day06/smallinput.txt"))).to.equal(19);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2022/day06/input.txt"))).to.equal(2334);
    });
  });
});