# Streams:

Breaking big file into smaller **chunks** instead of full file and then transferring it, then `Buffers` are used for storing those particular set of chunks in some intervals.

4 Types of Stream:

1. Readable
2. Writable
3. Duplex
4. Transform

# Buffers:

```js
const buffer = new Buffer.from("Gagandeep", "utf-8");
```

Here, `buffer` consist of the raw Binary Data but displays it in Hexadecimal when logged to the terminal:
Output: `<Buffer 47 61 67 61 6e 64 65 65 70>`
