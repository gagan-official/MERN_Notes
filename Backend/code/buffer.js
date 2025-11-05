const buffer = new Buffer.from("Gagandeep", "utf-8");

// console.log(buffer.toJSON());
console.log(JSON.parse(JSON.stringify(buffer)));
