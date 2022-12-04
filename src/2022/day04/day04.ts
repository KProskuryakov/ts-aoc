import { range, sum } from "../../IterTools";
import { intersect } from "../../SetUtils";

export function part1(lines: string[]) {
  return sum(lines.map(line => {
    const ranges = line.split(",");
    const nums = ranges.flatMap(range => {
      const splitrange = range.split("-");
      return splitrange.map(r => Number.parseInt(r));
    });
    if (nums[0] <= nums[2] && nums[1] >= nums[3]) {
      return 1;
    }
    if (nums[2] <= nums[0] && nums[3] >= nums[1]) {
      return 1;
    }
    return 0;
  }));
}

export function part2(lines: string[]) {
  return sum(lines.map(line => {
    const ranges = line.split(",");
    const nums = ranges.map(r => {
      const splitrange = r.split("-").map(n => Number.parseInt(n));
      return new Set(range(splitrange[0], splitrange[1], 1, true));
    });
    if (intersect(nums[0], nums[1]).size > 0) {
      return 1;
    }
    return 0;
  }));
}