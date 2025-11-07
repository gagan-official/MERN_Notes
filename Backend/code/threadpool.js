// const crypto = require("crypto");

// const start = Date.now();

// const MAX_CALLS = 2;

// for (let i = 0; i < MAX_CALLS; i++) {
//   crypto.pbkdf2("password", "salt", 100000, 512, "sha512", () => {
//     console.log(`Hash: ${i + 1}`, Date.now() - start);
//   });
// }

// // process.env.UV_THREADPOOL_SIZE

// console.log("code ended popped out from the call stack")

// const timer = setTimeout(()=>console.log("first"), 1000)
// timer.__repeat=true;
// console.log(timer)

const fs = require("fs");

const readableStream1 = fs.createReadStream(__filename);
const readableStream2 = fs.createReadStream(__filename);
readableStream1.close();
readableStream2.close();

readableStream1.on("close", () => {
  console.log("close 0.1");
  process.nextTick(() => console.log("nexttick 0.1"));
  process.nextTick(() => console.log("nexttick 0.1"));
  process.nextTick(() => console.log("nexttick 0.1"));
});

readableStream2.on("close", () => {
  console.log("close 0.2");
  process.nextTick(() => console.log("nexttick 0.1"));
  process.nextTick(() => console.log("nexttick 0.1"));
  process.nextTick(() => console.log("nexttick 0.1"));
});

fs.readFile("/home/bonami/Desktop/Noots/Backend/code/s.txt", (_,d) => {
  console.log(d)
  console.log("Readfile 1");
  process.nextTick(() => console.log("readfile Inner Nexttick 1"));
  process.nextTick(() => console.log("readfile Inner Nexttick 2"));
  process.nextTick(() => console.log("readfile Inner Nexttick 3"));
  process.nextTick(() => console.log("readfile Inner Nexttick 4"));
  Promise.resolve().then(() => console.log("readfile Inner Promise"));
  setImmediate(() => console.log("readfile Inner Immediate 1"));
});
fs.readFile("/home/bonami/Desktop/Noots/Backend/code/s.txt", () => {
  console.log("Readfile 2");
  process.nextTick(() => console.log("readfile Inner Nexttick 2.1"));
  process.nextTick(() => console.log("readfile Inner Nexttick 2.2"));
  process.nextTick(() => console.log("readfile Inner Nexttick 2.3"));
  process.nextTick(() => console.log("readfile Inner Nexttick 2.4"));
  Promise.resolve().then(() => console.log("readfile Inner Promise"));
  setImmediate(() => console.log("readfile Inner Immediate 2"));
});

console.log("global stack");
process.nextTick(() => console.log("nexttick 1"));
Promise.resolve().then(() => console.log("Promise 2"));
setTimeout(() => console.log("timer 3"));
setTimeout(() => {
  console.log("timer 4");
  process.nextTick(() => console.log("nexttick 4.1"));
  process.nextTick(() => console.log("nexttick 4.2"));
  process.nextTick(() => console.log("nexttick 4.3"));
  Promise.resolve().then(() => console.log("Promise 4"));
});
setTimeout(() => {
  console.log("timer 5");
  process.nextTick(() => console.log("nexttick 5"));
  Promise.resolve().then(() => console.log("Promise 5"));
});
setTimeout(() => console.log("timer 6"));

for (let i = 0; i < 9999999999; i++) {}