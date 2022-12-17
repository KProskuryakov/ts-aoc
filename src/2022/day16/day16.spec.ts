import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day16";

describe("2022-16", () => {
  describe("part 1", () => {
    it("does the thing with the small input", () => {
      expect(part1(linesFromFile("src/2022/day16/smallinput.txt"))).to.equal(1651);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2022/day16/input.txt"))).to.equal(1796);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small input", () => {
        expect(part2(linesFromFile("src/2022/day16/smallinput.txt"))).to.equal(1707);
      });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2022/day16/input.txt"))).to.equal(1999);
    });
  });
});