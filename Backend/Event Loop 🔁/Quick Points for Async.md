Promises are Core JS Feature and not provided by Browser Environment or Nodejs.

The Hand-off (Nodejs to libuv)

- V8 Engine - encounters async call.
- C++ Bindings - translation of JS code (that particular line only) into libuv format.
- Delegation - C++ binding invokes any specific libuv API (like `uv_timer_start` for timeouts or `uv_fs_read` for files).

## About Event Loop, libuv and all Queues in Nodejs:

- **Macrotask Queues** the are only part of **libuv**, which is in result handled by **Event Loop**,
- whereas the **Promise Queue** (resides under the **Microtask Queue**) is the only part of **V8 Engine**,
- and the **nextTick Queue** (another Microtask) is solely handled by Nodejs Core (JS layer of Nodejs), not by libuv or V8.
- Thus, both the Microtasks AREN'T handled by **Event Loop**, but by **V8 and Nodejs** respectively.

### Thus is executed in "Hand-off" or "Bridge" manner:

Which means Event Loop hands-off the control to Nodejs runtime, and vice-versa.

### Why they are separate?

Microtasks are **language-level** feature (Promises being part of JS), while Macrotasks are **environment-level** feature (Timers/IO being part of Node/Browsers).

### Separation of Responsibiliies:
- **V8 Engine**: Owns **Call Stack** and only **Promise Queue** (while **nextTick Queue** is handled by Nodejs evn itself).
- **libuv**: Owns **Event Loop** and all **Macrotasks Queues** (timer, IO, check and close).

In Browsers, Event Loop is a top level orchestrator watching both the queues (Micro and Macro). While in Nodejs the process is more modular, like doing "Hand-off" or say **Bridging**