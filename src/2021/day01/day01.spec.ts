import { expect } from "chai";
import { intsFromFile } from "../../AocUtils";
import { part1, part2 } from "./day01";

describe("2021-01", () => {
  describe("part 1", () => {
    it("should count the number of increases", () => {
      expect(part1([1,2,1,2,1,2])).to.equal(3);
    });
    it("should solve the puzzle", () => {
      expect(part1(Array.from(intsFromFile("src/2021/day01/input.txt")))).to.equal(1559);
    });
  });
  describe("part 2", () => {
    it("should sum up 4 and count increases", () => {
      const lines = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
      expect(part2(lines)).to.equal(5);
    });
    it("should solve the puzzle", () => {
      expect(part2(Array.from(intsFromFile("src/2021/day01/input.txt")))).to.equal(1600);
    });
  });
});