import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day11";

describe("2022-11", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2022/day11/smallinput.txt"))).to.equal(10605);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2022/day11/input.txt"))).to.equal(120384);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input 1", () => {
        expect(part2(linesFromFile("src/2022/day11/smallinput.txt"))).to.equal(2713310158);
      });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2022/day11/input.txt"))).to.equal(0);
    });
  });
});