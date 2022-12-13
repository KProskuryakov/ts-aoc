import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day12";

describe("2022-12", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2022/day12/smallinput.txt"))).to.equal(31);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2022/day12/input.txt"))).to.equal(361);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input 1", () => {
        expect(part2(linesFromFile("src/2022/day12/smallinput.txt"))).to.equal(29);
      });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2022/day12/input.txt"))).to.equal(354);
    });
  });
});