import { expect } from "chai";
import { groupby, slice } from "./ArrayTools";

describe("ArrayTools", () => {
  describe("groupby()", () => {
    it("produces an empty array when passed an empty array", () => {
      expect(groupby([])).to.deep.equal([]);
    })
    it("produces a single group when only one element is present", () => {
      expect(groupby([1])).to.deep.equal([[1]]);
    });
    it("groups things together simply", () => {
      expect(groupby([1,1,1,2,3,4,4,4,4,4])).to.deep.equal([[1,1,1],[2],[3],[4,4,4,4,4]]);
    });
  });
  describe("slice()", () => {
    it("slices ranges forward where the length of the slice is end - start, [start,end)", () => {
      expect(slice([0,1,2,3,4,5], 0, 4)).to.deep.equal([0,1,2,3]);
      expect(slice([0,1,2,3,4,5], 1, 4)).to.deep.equal([1,2,3]);
      expect(slice([0,1,2,3,4,5], 0, 6)).to.deep.equal([0,1,2,3,4,5]);
      expect(slice([0,1,2,3,4,5], 0, 20)).to.deep.equal([0,1,2,3,4,5]);
      expect(slice([0,1,2,3,4,5], 2, 2)).to.deep.equal([]);
      expect(slice([0,1,2,3,4,5], 0)).to.deep.equal([0,1,2,3,4,5]);
      expect(slice([0,1,2,3,4,5], 3)).to.deep.equal([3,4,5]);
    });
    it("correctly handles an empty array with various slice bounds, should just return an empty iterator", () => {
      expect(slice([], 2, 2)).to.deep.equal([]);
      expect(slice([], 0)).to.deep.equal([]);
      expect(slice([], -1, -5)).to.deep.equal([]);
    });
    it("correctly handles backwards slices (end,start]", () => {
      expect(slice([0,1,2,3,4,5], 6, 0)).to.deep.equal([5,4,3,2,1,0]);
      expect(slice([0,1,2,3,4,5], 2, 0)).to.deep.equal([1,0]);
    });
    it("correctly handles negative indexes, starting from the end", () => {
      expect(slice([0,1,2,3,4,5], -1)).to.deep.equal([5]);
      expect(slice([0,1,2,3,4,5], -6)).to.deep.equal([0,1,2,3,4,5]);
      expect(slice([0,1,2,3,4,5], -6, -1)).to.deep.equal([0,1,2,3,4]);
      expect(slice([0,1,2,3,4,5], -30, -24)).to.deep.equal([]);
      expect(slice([0,1,2,3,4,5], -30, -5)).to.deep.equal([0]);
    });
    it("correctly handles negative indexes and backwards slices together", () => {
      expect(slice([0,1,2,3,4,5], -1, -5)).to.deep.equal([4,3,2,1]);
      expect(slice([0,1,2,3,4,5], -1, 0)).to.deep.equal([4,3,2,1,0]);
    });
  });
});