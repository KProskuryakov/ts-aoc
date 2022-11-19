import { expect } from "chai";
import { linesFromFile } from "../../AocUtils";
import { part1, part2 } from "./day02";

describe("2021-02", () => {
  describe("part 1", () => {
    it("follows commands", () => {
      const commands = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"];
      expect(part1(commands)).to.equal(150);
    });
    it("solves the puzzle", () => {
      expect(part1(linesFromFile("src/2021/day02/input.txt"))).to.equal(1746616);
    });
  });
  describe("part 2", () => {
    it("follows commands", () => {
      const commands = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"];
      expect(part2(commands)).to.equal(900);
    });
    it("solves the puzzle", () => {
      expect(part2(linesFromFile("src/2021/day02/input.txt"))).to.equal(1741971043);
    });
  });
});