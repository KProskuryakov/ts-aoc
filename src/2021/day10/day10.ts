const cmap: Map<string, string> = new Map();
cmap.set(")", "(");
cmap.set("]", "[");
cmap.set("}", "{");
cmap.set(">", "<");

const imap: Map<string, number> = new Map();
imap.set(")", 3);
imap.set("]", 57);
imap.set("}", 1197);
imap.set(">", 25137);

const inputset: Set<string> = new Set(cmap.values());

export function part1(lines: string[]) {
  let result = 0;
  lines.forEach(line => {
    const stack: string[] = [];
    for (let c of line) {
      if (inputset.has(c)) {
        stack.push(c);
      } else if (stack[stack.length - 1] === cmap.get(c)) {
        stack.pop()
      } else {
        result += imap.get(c)!;
        return;
      }
    }
  });
  return result;
}

const smap: Map<string, number> = new Map();
smap.set("(", 1);
smap.set("[", 2);
smap.set("{", 3);
smap.set("<", 4);

export function part2(lines: string[]) {
  const scores = lines.flatMap(line => {
    const stack: string[] = [];
    for (let c of line) {
      if (inputset.has(c)) {
        stack.push(c);
      } else if (stack[stack.length - 1] === cmap.get(c)) {
        stack.pop()
      } else {
        return [];
      }
    }
    let score = 0;
    while(stack.length > 0) {
      score *= 5;
      score += smap.get(stack.pop()!)!;
    }
    return [score];
  });

  scores.sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
}