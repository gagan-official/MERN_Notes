const buffer = new Buffer.from("Gagandeep", "utf-8");

buffer.write("JohnCenaHulu")

console.log(buffer.toString()); // Output: Gagandeep

console.log(buffer.toJSON());
console.log(JSON.parse(JSON.stringify(buffer)));
// Output for both the code:
// { type: 'Buffer',
//   data: [
//      71,  97, 103,  97,
//     110, 100, 101, 101,
//     112
//   ]
// }:
