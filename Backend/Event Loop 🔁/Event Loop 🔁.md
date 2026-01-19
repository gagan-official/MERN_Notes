# 🔁 Event Loop:

![Event Loop Image](./code/event%20loop.png)

### Consist of 6 Queues (sorted by order of priority):

1. **Microtask queue**:

- `nextTick` Queue (1)
- `Promise` Queue (2)

2. **timer queue** (3) - `setTimeout`, `setInterval` cb [actually it's a `Min Heap` and not the `Queue` Data Structure]
3. **I/O queue** (4) - `fs`,`http` methods
4. **check queue** (5) - `setImmediate`
5. **close queue** (6) - close handlers like `socket.on('close', ()=>{})`

```
// (Synchronous Code Finishes)
Microtask Queues (nextTick/Promise) ->
Timers Phase ->
Microtask Queues ->
Pending Phase ->
Microtask Queues ->
Poll Phase (I/O Polling + I/O Callbacks) ->
Microtask Queues ->
Check Phase (setImmediate) ->
Microtask Queues ->
Close Callbacks Phase ->
Microtask Queues ->
// (Cycle Repeats to Timers Phase)
```

## I/O queue

```js
const fs = require("fs");

setTimeout(() => console.log("timer 1"));

fs.readFile(__filename, () => {
  console.log("Read whole file");
});
```

Guessing the output as "timer 1, Read whole file" is correct when passed 0 or `undefined` but sometimes the order would come like this: "Read whole file, timer 1".

This behavior because of how setTimeout method is written in CPP, as the **interval** param is written like this: `std::max(oneMillisecond, interval * oneMillisecond)` so eventually ***max*** of 1 and (0*1) will result in 1 millisecond delay, and somehow file reading operation sometimes done quickly and sometimes takes time so **the sequence of output is never guaranteed**.

### Can read more about Event Loop from [Nodejs' Official Documentation 🔗](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick).