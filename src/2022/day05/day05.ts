import { slice, split } from "../../ArrayTools";

export function part1(lines: string[]) {
  const [stateStrs, commandStrs] = split(lines, "");
  
  const state = createState(stateStrs);

  const commands = createCommands(commandStrs);
  
  for (let command of commands) {
    applyCommand(command, state);
  }

  return state.map(col => col.pop()!).join("");
}

function createState(stateStrs: string[]): string[][] {
  stateStrs.reverse();
  const state: string[][] = [];
  for (let i = 1; i < stateStrs[0].length; i+= 4) {
    state.push([]);
  }
  for (let line of slice(stateStrs, 1)) {
    for (let i = 1; i < line.length; i += 4) {
      if (line.charAt(i) !== " ") {
        state[(i - 1) / 4].push(line.charAt(i));
      }
    }
  }
  return state;
}

type Command = {count: number, source: number, dest: number};

function createCommands(commandStrs: string[]): Command[] {
  return commandStrs.map(line => {
    const [ , count,  , source,  , dest] = line.split(" ");
    return {count: Number.parseInt(count), source: Number.parseInt(source) - 1, dest: Number.parseInt(dest) - 1}
  });
}

function applyCommand(command: Command, state: string[][]) {
  for (let i = 0; i < command.count; i++) {
    const popped = state[command.source].pop()!;
    state[command.dest].push(popped);
  }
}

export function part2(lines: string[]) {
  const [stateStrs, commandStrs] = split(lines, "");
  
  const state = createState(stateStrs);

  const commands = createCommands(commandStrs);
  
  for (let command of commands) {
    applyCommand2(command, state);
  }

  return state.map(col => col.pop()!).join("");
}

function applyCommand2(command: Command, state: string[][]) {
  const cratesToMove: string[] = [];
  for (let i = 0; i < command.count; i++) {
    const popped = state[command.source].pop()!;
    cratesToMove.push(popped);
  }
  for (let i = 0; i < command.count; i++) {
    const popped = cratesToMove.pop()!;
    state[command.dest].push(popped);
  }
}