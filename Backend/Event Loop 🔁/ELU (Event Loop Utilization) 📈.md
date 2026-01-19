# Event Loop Utilization (ELU) 📈 ([View Online Blog 🔗](https://nodesource.com/blog/event-loop-utilization-nodejs))

An official metric Node.js uses to measure exactly that risk.

### 🌟 What is Event Loop Utilization (ELU)?

**Event Loop Utilization (ELU)** is a high-resolution performance metric introduced in Node.js (via the `perf_hooks` module) that quantifies **how much time the Node.js event loop spent processing work (busy) versus waiting for work (idle).**

In simple terms, ELU tells you: **_"How busy is the main JavaScript thread?"_**

It is expressed as a value between $0$ and $1$:

| ELU Value               | Meaning                                                | Implication                                                                                       |
| :---------------------- | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| **$0.0$ (or near $0$)** | The event loop is **100% idle**.                       | The server is healthy and waiting for requests.                                                   |
| **$0.5$**               | The event loop is **$50\%$ busy** and **$50\%$ idle**. | The server is handling load well but has plenty of capacity.                                      |
| **$1.0$ (or near $1$)** | The event loop is **$100\%$ busy**.                    | The server is likely **starving** and blocking. New requests will experience significant latency. |

### 🛠️ Why ELU is Important (The Starvation Metric)

Previously, developers relied on a less reliable metric called "`Event Loop Lag`" (the delay in a `setTimeout`). ELU is superior because it directly reflects the time spent on the main thread:

- **Identifies Blocking Code:** A high ELU confirms that your synchronous code or your highly-oscillating Macrotask/Microtask queues (like the example we just discussed) are running too long without yielding.
- **Capacity Planning:** It gives you a reliable measurement of your server's saturation. If your production server consistently runs with an ELU of $0.8$ or higher, you know you need to scale horizontally (add more instances) or optimize your code.
- **Threshold Triggering:** Services can use ELU to implement a **circuit breaker** pattern. For instance, if ELU exceeds $0.95$, the service might automatically respond to new requests with a **503 Service Unavailable** error to prevent a total crash and allow the queue to drain.

### 💡 How ELU is Calculated

The calculation relies on the `libuv` layer tracking time across two counters:

- **`active`:** The time the event loop is busy executing callbacks.
- **`idle`:** The time the event loop is waiting for I/O or other events to complete (often blocking in the Poll Phase).

The utilization is calculated over a sampling interval (e.g., 100 milliseconds):

$$\text{ELU} = \frac{\text{Active Time}}{\text{Active Time} + \text{Idle Time}}$$

<br>

### Here is a simple Node.js code snippet that demonstrates how to measure and report ELU, along with an explanation of the output:
---

## 💻 Monitoring Event Loop Utilization (ELU)

We will use the `performance.eventLoopUtilization()` method from Node.js's built-in `perf_hooks` module to measure how busy the main thread is over a one-second interval.

### Node.js Code Snippet

```javascript
const { performance } = require("perf_hooks");

// 1. Initial measurement
let eluPrevious = performance.eventLoopUtilization();

console.log("--- Starting ELU Monitor ---");

// 2. Set up the monitor to run every 1000ms (1 second)
const monitor = setInterval(() => {
  // 3. Get the current ELU measurement
  const eluCurrent = performance.eventLoopUtilization();

  // 4. Calculate the difference (delta) from the last measurement
  // This gives the utilization ONLY for the past 1000ms interval
  const utilization = performance.eventLoopUtilization(eluCurrent, eluPrevious);

  // 5. Calculate the percentage for readability (0.00 to 1.00)
  const percentage = (utilization.utilization * 100).toFixed(2);

  console.log(`ELU in last 1s: ${percentage}%`);

  // 6. Update the previous measurement for the next interval
  eluPrevious = eluCurrent;
}, 1000).unref(); // .unref() ensures the monitor doesn't keep the process alive

// --- SIMULATING EVENT LOOP BLOCKING / HEAVY WORK ---

// A. Low-Priority Block (Simulates long I/O or other tasks being processed)
// This will slightly increase ELU when it executes.
setTimeout(() => {
  let i = 0;
  while (i < 100000000) {
    // Simple busy loop
    i++;
  }
  console.log("[I/O Task Finished] Simulated heavy work executed.");
}, 2000); // Schedules heavy work to run after 2 seconds

// B. Continuous Microtask Block (Simulates high-frequency network traffic or Promises)
// This adds tasks repeatedly, forcing the loop to stay busy.
setTimeout(() => {
  let count = 0;
  function continuouslyBlock() {
    if (count++ < 5) {
      // Use setImmediate to schedule repeated work that will execute in the Check Phase
      setImmediate(continuouslyBlock);
      // Add a small sync block to raise the ELU value
      let j = 0;
      while (j < 5000000) {
        j++;
      }
    }
  }
  continuouslyBlock();
}, 4000); // Start repeated blocking after 4 seconds
```

### Expected Output Analysis

When you run this code, you'll typically see:

| Time (approx.) | `console.log` Output                | ELU Value Explanation                                                                                                                                                             |
| :------------- | :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **0s - 1s**    | `ELU in last 1s: 0.05%` (Low)       | The loop is mostly idle, just cycling through phases and waiting for timers.                                                                                                      |
| **1s - 2s**    | `ELU in last 1s: 0.10%` (Low)       | Still idle.                                                                                                                                                                       |
| **2s - 3s**    | `[I/O Task Finished]...`            | The `setTimeout` callback runs, executing the heavy `while` loop synchronously.                                                                                                   |
|                | `ELU in last 1s: 15.00%` (Spike)    | The ELU jumps because the loop was busy executing the synchronous `while` block.                                                                                                  |
| **3s - 4s**    | `ELU in last 1s: 0.08%` (Low)       | The loop returns to idle state.                                                                                                                                                   |
| **4s - 9s**    | $\text{...}$                        | The `continuouslyBlock` function is now running, scheduling the next iteration via `setImmediate` and executing a small synchronous loop repeatedly.                              |
|                | `ELU in last 1s: 2.50%` (Sustained) | The ELU remains high because the process is now constantly running the `setImmediate` callbacks and the synchronous `while` loop, demonstrating the loop is "busy" with CPU work. |

### Summary

The `performance.eventLoopUtilization()` API is your tool to measure the consequences of the long synchronous work and excessive oscillation we discussed. It directly validates whether your code is yielding control back to the event loop, thereby keeping the utilization low and the application responsive.
