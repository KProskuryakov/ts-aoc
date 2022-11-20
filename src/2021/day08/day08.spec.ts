import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day08";

describe("2021-08", () => {
  describe("part 1", () => {
    it("does the thing with the small sample", () => {
      expect(part1(linesFromFile("src/2021/day08/smallinput.txt"))).to.equal(26);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2021/day08/input.txt"))).to.equal(318);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small sample", () => {
      expect(part2(linesFromFile("src/2021/day08/smallinput.txt"))).to.equal(61229);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2021/day08/input.txt"))).to.equal(996280);
    });
  });
});