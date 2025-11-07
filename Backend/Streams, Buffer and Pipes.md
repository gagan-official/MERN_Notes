# Streams:

Breaking big file into smaller **chunks** instead of full file and then transferring it, then `Buffers` are used for storing those particular set of chunks in some intervals.

### 4 Types of Stream:

1. Readable (Reading a File)
2. Writable (Writing a File)
3. Duplex (both Readable and Writable) (Sockets)
4. Transform (Eg. File Compression: Write Compressed Data and Read De-Compressed Data)

[View Code 🔗](./code/streams.js)

# Pipes:

To connect (chain) both Readable and Writable Streams with each others. (Just like promise chaining).

# Buffers:

```js
const buffer = new Buffer.from("Gagandeep", "utf-8");
```

Here, `buffer` consist of the raw Binary Data but displays it in Hexadecimal when logged to the terminal:
Output: `<Buffer 47 61 67 61 6e 64 65 65 70>`

Now, `Buffer` is been created of 9 string characters in size, if we want to change the `Buffer`'s content using `write()` method then it's existing content will get overwrited:

```js
buffer.write("JohnCenaHulu");
```

**Output:** JohnCenaH

See, it only took 9 chars of new string as Buffer was created of only 9 size.
