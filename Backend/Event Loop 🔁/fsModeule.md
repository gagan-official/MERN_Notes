1. `fs.readFile()`(Callback-based): Which uses IO queue (being the callback pushed into the IO queue by libuv)

   - **The Path**: JS → Nodejs C++ Bindings → libuv Thread Pool → Poll Phase (IO Polling).

2. `fs.readFileSync()`(Synchronous): Which uses the main thread making the synchronous code blocking (being directly received by nodejs compiler from the **OS** (not libuv) and then the callback get executed synchronously, no other microtask can execute in between in the call stack). Bypassig the **Event Loop** entirely.

   - **The Path**: JS → Nodejs C++ Bindings → OS (direct) → JS.

3. `fs.promises.readFile()`(Promise-based): Which uses Promise Queue instead of IO queue (libuv directly injects it inside the promise queue, which then pushed into the Call Stack by V8 engine.) Directly making it execute prior than all the tasks but always after `process.nextTick`.

   - **The Path**: JS → Nodejs C++ Bindings → Libuv Thread Pool → **Promise Resolution** then being pushed to Promise Queue → JS.


#### Importing and using Promises version in many ways:

```js
import fs from "node:fs/promises";
fs.readFile();
```

```js
import fs from "node:fs";
fs.promises.readFile();
```

Note: `fs.createReadStream()` method is not the part of promises sub-module (the `.promises` property).

### Why there's need for `"node:"` prefix for built-in modules nowadays?

- In **CommonJS**, for Security purpose as `require("node:fs")` bypasses the `require.cache` which prevents attackers from **Poisioning** the cache to replace the core module with their own malicious code. It also guarantees that we're loading built-in modules which won't let the developers to load malicious modules accidentally like with `fss` typo or installing `fs` module via npm.

- While it still supports normal importing for legacy compatibility, still it's recommended to use node prefix now for Third-prty APIs like **Cloudflare Workers** to access some nodejs built-in modules. And also for supporting modern linting modules in IDEs for autocompletion supports.

- Also newer built-in modules (like `node:test` and `node:sqlite`(introduced in node v22.5.0)) can be imported by only using the node prefix.