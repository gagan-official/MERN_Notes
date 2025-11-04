// ################# I/O queue #################
const fs = require("fs");

// fs.readFile(__filename, () => {
//   console.log("Readfile 1");
//   process.nextTick(() => {
//     console.log("readfile Inner Nexttick");
//     fs.readFile(__filename, () => console.log("readfile inner Nexttick inner Readfile 2"));
//   });
//   Promise.resolve().then(() => console.log("readfile Inner Promise"));
//   setImmediate(() => console.log("readfile Inner Immediate 1"));
// });

process.nextTick(() => console.log("Nexttick 1"));
Promise.resolve().then(() => console.log("Promise 1"));
setTimeout(() => {
  console.log("timer 1");
  process.nextTick(() => {
    console.log("timer wala nextTick** (19)");
    setTimeout(() => console.log("timer wapsi (20)"));
    for (let i = 0; i < 2000000000; i++) {}
  });
});
setImmediate(() => {
  console.log("Immediate 1 (24)");
  process.nextTick(() => {
    console.log("Immediate inner Nexttick*** 2 (26)");
    setTimeout(() =>
      console.log("Immediate inner Nexttick inner timeout*** (28)")
    );
    setImmediate(() => {
      console.log("Immediate inner Nexttick inner Immediate*** (31)");
      process.nextTick(() => {
        console.log("next tick wapis aa gya (33)");
        setTimeout(() => console.log("settimout hitted (34)"));
        for (let i = 0; i < 2000000000; i++) {}
        setImmediate(() => console.log("Immediate hitted (35)"));
      });
    });
  });
  Promise.resolve().then(() => console.log("Immediate inner Promise 2"));
});

for (let i = 0; i < 2000000000; i++) {}

// ################# I/O queue #################
// const fs = require("fs");

// fs.readFile(__filename, () => {
//   console.log("Readfile 1");
// });

// process.nextTick(() => console.log("Nexttick 1"));
// Promise.resolve().then(() => console.log("Promise 1"));
// setTimeout(() => console.log("timer 1"));

// for (let i = 0; i < 2000000000; i++) {}

// process.nextTick(() => console.log("Next tick"));
// Promise.resolve().then(() => console.log("Promise Log"));

// // ################# timer Queue #################
// setTimeout(() => console.log("timeout 1"));
// setTimeout(() => {
//   console.log("timeout 2");
//   Promise.resolve().then(()=>console.log("Timer's inner Promise"))
//   process.nextTick(() => console.log("timer's inner next tick"));
// });
// setTimeout(() => console.log("timeout 3"));

// // ################# microtask queue: #################
// // ------- nextTick Queue -------
// process.nextTick(() => console.log("next tick 1"));
// process.nextTick(() => {
//   console.log("next tick 2");
//   process.nextTick(() => console.log("nextTick's inner next tick"));
// });
// process.nextTick(() => console.log("next tick 3"));

// // ------- Promise Queue -------
// Promise.resolve().then(() => console.log("promise 1"));
// Promise.resolve().then(() => {
//   console.log("promise 2");
//   process.nextTick(() => console.log("Promise inner next tick"));
// });
// Promise.resolve().then(() => console.log("promise 3"));

// console.log("console 1");
// process.nextTick(() => console.log("console 3"));
// console.log("console 2");
