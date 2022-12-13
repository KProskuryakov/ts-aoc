import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day13";

describe("2022-13", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2022/day13/smallinput.txt"))).to.equal(13);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2022/day13/input.txt"))).to.equal(5555);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input 1", () => {
        expect(part2(linesFromFile("src/2022/day13/smallinput.txt"))).to.equal(140);
      });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2022/day13/input.txt"))).to.equal(22852);
    });
  });
});