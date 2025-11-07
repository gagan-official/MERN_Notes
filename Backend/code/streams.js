const { createReadStream, createWriteStream } = require("fs");

const readableStream = createReadStream("./hello.txt", {
  encoding: "utf-8",
  highWaterMark: 2,
});

const writableStream = createWriteStream("./s.txt");

// readableStream.on("data", (chunk) => {
//   console.log(chunk);
//   writableStream.write(chunk);
// });

// ######################## Or ########################

readableStream.pipe(writableStream);
