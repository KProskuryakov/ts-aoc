import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day17";

describe("2022-17", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2022/day17/smallinput.txt"))).to.equal(0);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2022/day17/input.txt"))).to.equal(0);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input", () => {
        expect(part2(linesFromFile("src/2022/day17/smallinput.txt"))).to.equal(0);
      });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2022/day17/input.txt"))).to.equal(0);
    });
  });
});