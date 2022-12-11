System.register("IterTools", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function zip2(a, b) {
        return map2(a, b, (a, b) => [a, b]);
    }
    exports_1("zip2", zip2);
    function zip2longest(a, b, defaultA, defaultB) {
        return map2longest(a, b, defaultA, defaultB, (a, b) => [a, b]);
    }
    exports_1("zip2longest", zip2longest);
    function iter(i) {
        return i[Symbol.iterator]();
    }
    exports_1("iter", iter);
    // end - start = number of elements sliced
    function* slice(a, start, end) {
        if (start < 0)
            start = max(0, a.length + start);
        if (start > a.length)
            start = a.length;
        if (end && end < 0)
            end = max(0, a.length + end);
        if (end === undefined || end > a.length)
            end = a.length;
        if (start > end) { // reverse slice
            start--;
            end--;
        }
        let cur = start;
        while (cur !== end) {
            yield a[cur];
            cur += cur < end ? 1 : -1;
        }
    }
    exports_1("slice", slice);
    function max(...rest) {
        return reduce(rest, Number.NEGATIVE_INFINITY, (c, n) => { return c > n ? c : n; });
    }
    exports_1("max", max);
    function min(...rest) {
        return reduce(rest, Number.POSITIVE_INFINITY, (c, n) => { return c < n ? c : n; });
    }
    exports_1("min", min);
    function* map(iter, func) {
        for (let item of iter) {
            yield func(item);
        }
    }
    exports_1("map", map);
    function* map2(iter1, iter2, func) {
        let ai = iter(iter1);
        let bi = iter(iter2);
        let res1 = ai.next();
        let res2 = bi.next();
        while (!res1.done && !res2.done) {
            yield func(res1.value, res2.value);
            res1 = ai.next();
            res2 = bi.next();
        }
    }
    exports_1("map2", map2);
    function* map2longest(iter1, iter2, default1, default2, func) {
        let ai = iter(iter1);
        let bi = iter(iter2);
        let res1 = ai.next();
        let res2 = bi.next();
        while (!res1.done || !res2.done) {
            if (!res1.done && !res2.done) {
                yield func(res1.value, res2.value);
                res1 = ai.next();
                res2 = bi.next();
            }
            else if (res2.done) {
                yield func(res1.value, default2);
                res1 = ai.next();
            }
            else if (res1.done) {
                yield func(default1, res2.value);
                res2 = bi.next();
            }
        }
    }
    exports_1("map2longest", map2longest);
    function* mapArray(iterables, func) {
        const iterators = Array.from(map(iterables, iter));
        let results = Array.from(map(iterators, (i) => i.next()));
        while (all(map(results, (r) => !r.done))) {
            yield func(map(results, (r) => r.value));
            results = Array.from(map(iterators, (i) => i.next()));
        }
    }
    exports_1("mapArray", mapArray);
    function all(iter) {
        // TODO make this short circuit
        return reduce(iter, true, (c, n) => c && n);
    }
    exports_1("all", all);
    function any(iter) {
        // TODO make this short circuit
        return reduce(iter, false, (c, n) => c || n);
    }
    exports_1("any", any);
    function* filter(iter, func) {
        for (let item of iter) {
            if (func(item)) {
                yield item;
            }
        }
    }
    exports_1("filter", filter);
    function reduce(iter, start, func) {
        let final = start;
        for (const i of iter) {
            final = func(final, i);
        }
        return final;
    }
    exports_1("reduce", reduce);
    function sum(iterable) {
        return reduce(iterable, 0, (c, n) => c + n);
    }
    exports_1("sum", sum);
    function* accum(iterable, start, func) {
        let final = start;
        for (const i of iterable) {
            final = func(final, i);
            yield final;
        }
        yield final;
    }
    exports_1("accum", accum);
    function* range(start, end, step = 1, inclusive = false) {
        if (end === undefined)
            end = Infinity;
        if (end < start) {
            if (inclusive) {
                end--;
            }
            for (let i = start; i > end; i -= step) {
                yield i;
            }
        }
        else {
            if (inclusive) {
                end++;
            }
            for (let i = start; i < end; i += step) {
                yield i;
            }
        }
    }
    exports_1("range", range);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("AocUtils", ["fs", "IterTools"], function (exports_2, context_2) {
    "use strict";
    var fs_1, IterTools_1;
    var __moduleName = context_2 && context_2.id;
    function linesFromFile(inFile) {
        return fs_1.readFileSync(inFile, "utf-8").split("\n");
    }
    exports_2("linesFromFile", linesFromFile);
    function intsFromFile(inFile) {
        return IterTools_1.map(linesFromFile(inFile), Number.parseInt);
    }
    exports_2("intsFromFile", intsFromFile);
    function parseCommaLineToInts(line) {
        return line.split(",").map(v => parseInt(v));
    }
    exports_2("parseCommaLineToInts", parseCommaLineToInts);
    function parseCharsToInts(line) {
        return Array.from(line).map(c => Number.parseInt(c));
    }
    exports_2("parseCharsToInts", parseCharsToInts);
    function stepToward(source, dest, step = 1) {
        if (dest > source) {
            return source + step;
        }
        else if (dest < source) {
            return source - step;
        }
        return source;
    }
    exports_2("stepToward", stepToward);
    return {
        setters: [
            function (fs_1_1) {
                fs_1 = fs_1_1;
            },
            function (IterTools_1_1) {
                IterTools_1 = IterTools_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("2022/day09/day09_2022_vis", ["AocUtils"], function (exports_3, context_3) {
    "use strict";
    var AocUtils_1, divs;
    var __moduleName = context_3 && context_3.id;
    function* part2(lines) {
        const dirs = lines.map(l => {
            const [dir, magstr] = l.split(" ");
            const steps = Number.parseInt(magstr);
            if (dir === "R") {
                return { x: 1, y: 0, steps: steps };
            }
            if (dir === "U") {
                return { x: 0, y: -1, steps: steps };
            }
            if (dir === "L") {
                return { x: -1, y: 0, steps: steps };
            }
            if (dir === "D") {
                return { x: 0, y: 1, steps: steps };
            }
            return { x: 0, y: 0, steps: 0 };
        });
        const visited = new Set();
        let rope = [];
        for (let i = 0; i < 10; i++) {
            rope.push({ x: 0, y: 0 });
        }
        visited.add("0,0");
        for (let v of dirs) {
            for (let i = 0; i < v.steps; i++) {
                rope[0].x += v.x;
                rope[0].y += v.y;
                for (let r = 1; r < rope.length; r++) {
                    const curRope = rope[r];
                    const aheadRope = rope[r - 1];
                    if (Math.abs(aheadRope.x - curRope.x) >= 2 || Math.abs(rope[r - 1].y - rope[r].y) >= 2) {
                        curRope.x = AocUtils_1.stepToward(curRope.x, aheadRope.x);
                        curRope.y = AocUtils_1.stepToward(curRope.y, aheadRope.y);
                    }
                }
                visited.add(rope[rope.length - 1].x + "," + rope[rope.length - 1].y);
                yield;
            }
        }
        ;
    }
    return {
        setters: [
            function (AocUtils_1_1) {
                AocUtils_1 = AocUtils_1_1;
            }
        ],
        execute: function () {
            divs = [];
            for (let i = 0; i < 30; i++) {
                const divline = [];
                for (let j = 0; j < 30; j++) {
                    let newDiv = new HTMLDivElement();
                    newDiv.className = "space";
                    newDiv = document.body.appendChild(newDiv);
                    divline.push(newDiv);
                }
                divs.push(divline);
            }
        }
    };
});
