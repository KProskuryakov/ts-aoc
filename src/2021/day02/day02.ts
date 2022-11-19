import { map, reduce } from "../../FuncUtils";

type Command = [string, number];
type State = {hor: number, depth: number}

export function part1(commands: string[]) {
  const cs = map(commands, parseCommand);
  const final = reduce(cs, {hor: 0, depth: 0}, processCommand1);
  return final.depth * final.hor;
}

function parseCommand(str: string): Command {
  const sp = str.split(" ");
  return [sp[0], Number.parseInt(sp[1])];
}

function processCommand1(s_mut: State, c: Command) {
  if (c[0] === "forward") s_mut.hor += c[1];
  else if (c[0] === "down") s_mut.depth += c[1];
  else if (c[0] === "up") s_mut.depth -= c[1];
  return s_mut;
}

type State2 = {hor: number, depth: number, aim: number}

export function part2(commands: string[]) {
  const cs = map(commands, parseCommand);
  const final = reduce(cs, {hor: 0, depth: 0, aim: 0}, processCommand2);
  return final.depth * final.hor;
}

function processCommand2(s_mut: State2, c: Command) {
  if (c[0] === "forward") { s_mut.hor += c[1]; s_mut.depth += c[1] * s_mut.aim }
  else if (c[0] === "down") s_mut.aim += c[1];
  else if (c[0] === "up") s_mut.aim -= c[1];
  return s_mut;
}