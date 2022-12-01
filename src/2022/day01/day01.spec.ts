import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day01";

describe("2022-01", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2022/day01/smallinput.txt"))).to.equal(24000);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2022/day01/input.txt"))).to.equal(65912);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input", () => {
      expect(part2(linesFromFile("src/2022/day01/smallinput.txt"))).to.equal(45000);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2022/day01/input.txt"))).to.equal(195625);
    });
  });
});