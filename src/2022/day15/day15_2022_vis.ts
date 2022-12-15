import { max, min } from '../../IterTools';

// @ts-ignore
import inputUrl from './input.txt'

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

fetch(inputUrl).then(res => {
  res.text().then(t => {
    code(t.split("\n"), 4000000);
  })
});

let minY = 0;
let maxY = 0;
let minX = 0;
let maxX = 0;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

ctx.fillStyle = "darkgray";
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

function screenspaceX(x: number) {
  return Math.floor(((x - minX) / (maxX - minX)) * canvasWidth);
}

function screenspaceY(y: number) {
  return Math.floor(((y - minY) / (maxY - minY)) * canvasHeight);
}


function code(lines: string[], searchArea: number) {
  const sensorFields = lines.map(l => {
    const halves = l.split(": ");
    const left = halves[0].split("at ")[1];
    const leftsplit = left.split(", ");
    const sx = Number.parseInt(leftsplit[0].split("=")[1]);
    const sy = Number.parseInt(leftsplit[1].split("=")[1]);

    const right = halves[1].split("at ")[1];
    const rightsplit = right.split(", ");
    const bx = Number.parseInt(rightsplit[0].split("=")[1]);
    const by = Number.parseInt(rightsplit[1].split("=")[1]);

    const md = Math.abs(sx - bx) + Math.abs(sy - by);

    return {sx, sy, bx, by, md};
  });

  minY = min(...sensorFields.map(v => v.sy - v.md)) - 100000;
  maxY = max(...sensorFields.map(v => v.sy + v.md)) + 100000;
  minX = min(...sensorFields.map(v => v.sx - v.md)) - 100000;
  maxX = max(...sensorFields.map(v => v.sx + v.md)) + 100000;

  let missingX = 0;
  let missingY = 0;

  for (let y = 0; y <= searchArea; y++) {
    const lengths: {x1: number, x2: number}[] = [];

    for (let f of sensorFields) {
      if (y > f.sy + f.md || y < f.sy - f.md) {
        continue; // outside the range
      }
      const ydist = f.md - Math.abs(f.sy - y);
      lengths.push({x1: f.sx - ydist, x2: f.sx + ydist});
    }

    merge(lengths);

    if (lengths.length > 1) {
      missingX = lengths[0].x2 + 1
      missingY = y;
    }
  }

  ctx.lineWidth = 2;
  ctx.strokeStyle = "red";
  ctx.strokeRect(screenspaceX(0), screenspaceY(0), screenspaceX(searchArea) - screenspaceX(0), screenspaceY(searchArea) - screenspaceY(0));

  sensorFields.forEach(v => {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(screenspaceX(v.sx - v.md), screenspaceY(v.sy)); // left
    ctx.lineTo(screenspaceX(v.sx), screenspaceY(v.sy - v.md)); // top
    ctx.lineTo(screenspaceX(v.sx + v.md), screenspaceY(v.sy)); // right
    ctx.lineTo(screenspaceX(v.sx), screenspaceY(v.sy + v.md)); // bottom
    ctx.closePath();
    ctx.stroke();
  });

  sensorFields.forEach(v => {
    ctx.fillStyle = "black";
    ctx.fillRect(screenspaceX(v.sx) - 3, screenspaceY(v.sy) - 3, 6, 6);
    ctx.fillStyle = "red";
    ctx.fillRect(screenspaceX(v.bx) - 3, screenspaceY(v.by) - 3, 6, 6);
  });

  ctx.strokeStyle = "white"
  ctx.strokeRect(screenspaceX(missingX) - 5, screenspaceY(missingY) - 5, 10, 10);
  ctx.strokeRect(screenspaceX(missingX) - 10, screenspaceY(missingY) - 10, 20, 20);
  ctx.strokeRect(screenspaceX(missingX) - 15, screenspaceY(missingY) - 15, 30, 30);
}



function intersects(a: {x1: number, x2: number}, b: {x1: number, x2: number}): boolean {
  return !(a.x1 < b.x1 - 1 && a.x2 < b.x1 - 1 || a.x1 > b.x2 + 1 && a.x2 > b.x2 + 1);
}

// function contains(outside: {x1: number, x2: number}, inside: {x1: number, x2: number}): boolean {
//   return inside.x1 >= outside.x1 && inside.x2 <= outside.x2;
// }

function merge(lengths: {x1: number, x2: number}[]) {
  lengths.sort((a, b) => a.x1 - b.x1);
  for (let i = 0; i < lengths.length - 1; i++) {
    if (intersects(lengths[i], lengths[i + 1])) {
      lengths[i].x1 = Math.min(lengths[i].x1, lengths[i + 1].x1);
      lengths[i].x2 = Math.max(lengths[i].x2, lengths[i + 1].x2);
      lengths.splice(i + 1, 1);
      i--;
    }
  }
  return lengths;
}