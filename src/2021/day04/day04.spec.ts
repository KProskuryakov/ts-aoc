import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day04";

describe("2021-04", () => {
  describe("part 1", () => {

    it("does the thing with the small sample", () => {
      expect(part1(linesFromFile("src/2021/day04/smallinput.txt"))).to.equal(4512);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2021/day04/input.txt"))).to.equal(51034);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small sample", () => {
      expect(part2(linesFromFile("src/2021/day04/smallinput.txt"))).to.equal(1924);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2021/day04/input.txt"))).to.equal(5434);
    });
  });
});