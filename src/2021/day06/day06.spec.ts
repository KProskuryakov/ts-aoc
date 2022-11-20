import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day06";

describe("2021-06", () => {
  describe("part 1", () => {

    it("does the thing with the small sample", () => {
      expect(part1("3,4,3,1,2")).to.equal(5934);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2021/day06/input.txt")[0])).to.equal(350149);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small sample", () => {
      expect(part2("3,4,3,1,2")).to.equal(26984457539);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2021/day06/input.txt")[0])).to.equal(1590327954513);
    });
  });
});