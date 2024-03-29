import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day09";

describe("2022-09", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2022/day09/smallinput.txt"))).to.equal(13);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2022/day09/input.txt"))).to.equal(5779);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input 1", () => {
        expect(part2(linesFromFile("src/2022/day09/smallinput.txt"))).to.equal(1);
      });
    it("does the thing with the small input 2", () => {
      expect(part2(linesFromFile("src/2022/day09/smallinput2.txt"))).to.equal(36);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2022/day09/input.txt"))).to.equal(2331);
    });
  });
});