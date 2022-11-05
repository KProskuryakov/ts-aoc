import { expect } from "chai";
import { slice } from "./FuncUtils";

describe("util-tests", () => {
  it("slice does the range things well", () => {
    expect(Array.from(slice([0,1,2,3,4,5], 0, 4))).to.deep.equal([0,1,2,3]);
    expect(Array.from(slice([0,1,2,3,4,5], 6, 0))).to.deep.equal([3,2,1,0]);
    expect(Array.from(slice([0,1,2,3,4,5], 0, 4))).to.deep.equal([0,1,2,3]);
  });
});