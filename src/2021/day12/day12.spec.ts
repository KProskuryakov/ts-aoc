import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day12";

describe("2021-12", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2021/day12/smallinput.txt"))).to.equal(226);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2021/day12/input.txt"))).to.equal(4411);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input", () => {
      expect(part2(linesFromFile("src/2021/day12/smallinput.txt"))).to.equal(3509);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2021/day12/input.txt"))).to.equal(136767);
    });
  });
});