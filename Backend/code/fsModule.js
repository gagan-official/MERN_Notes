const fs = require("fs");

fs.writeFile(
  "hello.txt",
  "Hello Ella!",
  { flag: "a" /* for appending content in file */ },
  (e) => {
    if (e) console.log(e);
    else console.log("File content is updated.");
  }
);
