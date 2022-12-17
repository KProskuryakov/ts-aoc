import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day15";

describe("2022-15", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2022/day15/smallinput.txt"), 10)).to.equal(26);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2022/day15/input.txt"), 2000000)).to.equal(5127797);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input", () => {
        expect(part2(linesFromFile("src/2022/day15/smallinput.txt"), 20)).to.equal(56000011);
      });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2022/day15/input.txt"), 4000000)).to.equal(12518502636475);
    });
  });
});