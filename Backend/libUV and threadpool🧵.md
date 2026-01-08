## `libuv`:

1. Handles each async code,
2. Pre-decided where to send the async code, CPU bound operations are sent to OS based I/O multiplexers like `epoll` (linux), `kqueue` (macOS), `IOCP - I/O Completion Ports` (Windows),
   whereas I/O bound operations are sent to the `threadpool`

>     But still libuv sends mix of async tasks either to IO multiplexers or to Threadpool, it's still not delegated on the basis of CPU or I/O bounds.

#### 🧠 CPU Bound Operations:

CPU bound operations are those that spend most of their time actively using the CPU to perform calculations or processing tasks.

The operation's speed is limited by the CPU's processing power and the time it takes to execute the code.

**Examples:**

1. Complex calculations (e.g., financial modeling, heavy math).
2. Data compression/decompression (e.g., zipping a large file).
3. Image or video processing (e.g., resizing, transcoding).
4. Heavy Regular Expression matching.

---

#### 💾 I/O bound operations:

I/O bound operations are those that spend most of their time waiting for data to be transferred between the main application and external sources like disks, networks, or databases.

The operation's speed is limited by the speed of Input/Output tasks, not the CPU's processing power.

**Examples:**

1. Reading or writing to the file system (e.g., fs.readFile).
2. Making network requests (e.g., fetching data from a REST API).
3. Querying a database (e.g., MongoDB, PostgreSQL).

### includes `threadpool`🧵:

- consists of **4 threads** by default, can be increased (mostly recommended to be declared at top of the server invocation): `process.env.UV_THREADPOOL_SIZE = 5`
- **Size** must be decided on the basis of CPU cores. (can check from Task Manager window in each OS, how many CPU cores are available in the machine)
