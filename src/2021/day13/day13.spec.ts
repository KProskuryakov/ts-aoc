import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day13";

describe("2021-13", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2021/day13/smallinput.txt"))).to.equal(17);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2021/day13/input.txt"))).to.equal(731);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input", () => {
      expect(part2(linesFromFile("src/2021/day13/smallinput.txt"))).to.equal(16);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2021/day13/input.txt"))).to.equal(93);
    });
  });
});