import { Jinter } from './dist/index.js';
const code = `
        const a = "this is a test";
        const arr = String.prototype.split.call(a, "");
        const joined = Array.prototype.join.call(arr, "");
        console.log(new Date("2021-01-01").getTime());
      `;

const jinter = new Jinter(code);

console.log(jinter.interpret());
