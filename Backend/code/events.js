const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("connect-listen", (PORT) => {
  console.log("Listening server on port ", PORT);
});

console.log("run before listening");
emitter.emit("connect-listen", 5000);
console.log("run after listening");

// class PizzaShop {
//   constructor() {
//     this.orderNumber = 0;
//   }
//   order() {
//     this.orderNumber++;
//   }

//   displayOrderNumber() {
//     console.log(`Current order number: ${this.orderNumber}`);
//   }
// }

module.exports = PizzaShop