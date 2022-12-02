import { sum } from "../../IterTools";

type Hand = "rock" | "paper" | "scissors";

const Winners = {
  "rock": "paper" as Hand,
  "paper": "scissors" as Hand,
  "scissors": "rock" as Hand
}

const Losers = {
  "rock": "scissors" as Hand,
  "paper": "rock" as Hand,
  "scissors": "paper" as Hand
}

const Points = {
  "rock": 1,
  "paper": 2,
  "scissors": 3
}

export function part1(lines: string[]) {
  const oppMap = new Map<string, Hand>([
    ["A", "rock"],
    ["B", "paper"],
    ["C", "scissors"]
  ]);

  const resMap = new Map<string, Hand>([
    ["X", "rock"],
    ["Y", "paper"],
    ["Z", "scissors"]
  ]);

  const scores = lines.map(line => {
    const [opp, res] = line.split(" ");
    const opphand = oppMap.get(opp)!;
    const reshand = resMap.get(res)!;
    return Points[reshand] + getResultScore(opphand, reshand);
  });

  return sum(scores);
}

function getResultScore(opp: Hand, res: Hand) {
  if (Winners[opp] === res) {
    return 6;
  } else if (opp === res) {
    return 3;
  } else {
    return 0;
  }
}

export function part2(lines: string[]) {
  const oppMap = new Map<string, Hand>([
    ["A", "rock"],
    ["B", "paper"],
    ["C", "scissors"]
  ]);

  const resMap = new Map<string, number>([
    ["X", 0],
    ["Y", 3],
    ["Z", 6]
  ]);

  const scores = lines.map(line => {
    const [opp, res] = line.split(" ");
    const opphand = oppMap.get(opp)!;
    const resScore = resMap.get(res)!;

    if (resScore === 0) {
      return Points[Losers[opphand]] + resScore;
    } else if (resScore === 6) {
      return Points[Winners[opphand]] + resScore;
    }
    return Points[opphand] + resScore;
  });

  return sum(scores);
}