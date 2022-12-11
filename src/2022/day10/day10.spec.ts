import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day10";

describe("2022-10", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2022/day10/smallinput.txt"))).to.equal(13140);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2022/day10/input.txt"))).to.equal(13680);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input 1", () => {
        expect(part2(linesFromFile("src/2022/day10/smallinput.txt"))).to.equal(124);
      });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2022/day10/input.txt"))).to.equal(102);
    });
  });
});