import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day09";

describe("2021-09", () => {
  describe("part 1", () => {
    it("does the thing with the small sample", () => {
      expect(part1(linesFromFile("src/2021/day09/smallinput.txt"))).to.equal(15);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2021/day09/input.txt"))).to.equal(558);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small sample", () => {
      expect(part2(linesFromFile("src/2021/day09/smallinput.txt"))).to.equal(1134);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2021/day09/input.txt"))).to.equal(882942);
    });
  });
});