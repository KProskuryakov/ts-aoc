import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day07";

describe("2021-07", () => {
  describe("part 1", () => {

    it("does the thing with the small sample", () => {
      expect(part1("16,1,2,0,4,2,7,1,2,14")).to.equal(37);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2021/day07/input.txt")[0])).to.equal(355764);
    });
  });
  describe("part 2", () => {
    it("does the thing with the small sample", () => {
      expect(part2("16,1,2,0,4,2,7,1,2,14")).to.equal(168);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2021/day07/input.txt")[0])).to.equal(99634572);
    });
  });
});