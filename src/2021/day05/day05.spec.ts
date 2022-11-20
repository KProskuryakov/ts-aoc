import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day05";

describe("2021-05", () => {
  describe("part 1", () => {

    it("does the thing with the small sample", () => {
      expect(part1(linesFromFile("src/2021/day05/smallinput.txt"))).to.equal(5);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2021/day05/input.txt"))).to.equal(6461);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small sample", () => {
      expect(part2(linesFromFile("src/2021/day05/smallinput.txt"))).to.equal(12);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2021/day05/input.txt"))).to.equal(18065);
    });
  });
});