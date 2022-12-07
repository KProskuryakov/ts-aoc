import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day07";

describe("2022-07", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2022/day07/smallinput.txt"))).to.equal(95437);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2022/day07/input.txt"))).to.equal(1427048);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input", () => {
      expect(part2(linesFromFile("src/2022/day07/smallinput.txt"))).to.equal(24933642);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2022/day07/input.txt"))).to.equal(2940614);
    });
  });
});