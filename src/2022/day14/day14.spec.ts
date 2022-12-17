import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day14";

describe("2022-14", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2022/day14/smallinput.txt"))).to.equal(24);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2022/day14/input.txt"))).to.equal(737);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input", () => {
        expect(part2(linesFromFile("src/2022/day14/smallinput.txt"))).to.equal(93);
      });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2022/day14/input.txt"))).to.equal(28145);
    });
  });
});