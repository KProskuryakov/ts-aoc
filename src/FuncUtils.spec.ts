import { expect } from "chai";
import { slice, sum } from "./FuncUtils";

describe("util-tests", () => {
  describe("slice()", () => {
    it("slices ranges forward where the length of the slice is end - start, [start,end)", () => {
      expect(Array.from(slice([0,1,2,3,4,5], 0, 4))).to.deep.equal([0,1,2,3]);
      expect(Array.from(slice([0,1,2,3,4,5], 1, 4))).to.deep.equal([1,2,3]);
      expect(Array.from(slice([0,1,2,3,4,5], 0, 6))).to.deep.equal([0,1,2,3,4,5]);
      expect(Array.from(slice([0,1,2,3,4,5], 0, 20))).to.deep.equal([0,1,2,3,4,5]);
      expect(Array.from(slice([0,1,2,3,4,5], 2, 2))).to.deep.equal([]);
      expect(Array.from(slice([0,1,2,3,4,5], 0))).to.deep.equal([0,1,2,3,4,5]);
      expect(Array.from(slice([0,1,2,3,4,5], 3))).to.deep.equal([3,4,5]);
    });
    it("correctly handles an empty array with various slice bounds, should just return an empty iterator", () => {
      expect(Array.from(slice([], 2, 2))).to.deep.equal([]);
      expect(Array.from(slice([], 0))).to.deep.equal([]);
      expect(Array.from(slice([], -1, -5))).to.deep.equal([]);
    });
    it("correctly handles backwards slices (end,start]", () => {
      expect(Array.from(slice([0,1,2,3,4,5], 6, 0))).to.deep.equal([5,4,3,2,1,0]);
      expect(Array.from(slice([0,1,2,3,4,5], 2, 0))).to.deep.equal([1,0]);
    });
    it("correctly handles negative indexes, starting from the end", () => {
      expect(Array.from(slice([0,1,2,3,4,5], -1))).to.deep.equal([5]);
      expect(Array.from(slice([0,1,2,3,4,5], -6))).to.deep.equal([0,1,2,3,4,5]);
      expect(Array.from(slice([0,1,2,3,4,5], -6, -1))).to.deep.equal([0,1,2,3,4]);
      expect(Array.from(slice([0,1,2,3,4,5], -30, -24))).to.deep.equal([]);
      expect(Array.from(slice([0,1,2,3,4,5], -30, -5))).to.deep.equal([0]);
    });
    it("correctly handles negative indexes and backwards slices together", () => {
      expect(Array.from(slice([0,1,2,3,4,5], -1, -5))).to.deep.equal([4,3,2,1]);
      expect(Array.from(slice([0,1,2,3,4,5], -1, 0))).to.deep.equal([4,3,2,1,0]);
    });
  });
  describe("sum()", () => {
    it("sums up an array", () => {
      expect(sum([1,2,3,4])).to.equal(10);
    });
  });
});