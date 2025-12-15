# Mongoose 🐀

An Open-Source ODM using the official "[**MongoDB Node.js Driver**](https://www.mongodb.com/docs/drivers/node/current/get-started/)" under the hood

1. Schema
2. Model
3. Query

## Connecting Mongoose to MongoDB:

```js
mongoose
  .connect("mongodb://localhost:27017/<DB_NAME>")
  .then(
    () => console.log("mongodb is connected ✅") // both logs and errors CBs are optional as mongoose ques up all the commands made before connection which eventually makes mongodb rarely to crash out
  )
  .catch(console.error);
```

## Making Schemas:

```js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  createdAt: Date,
  updatedAt: Date,
  bestFriend: mongoose.SchemaTypes.ObjectId,
  hobbies: [String],
  //   address: {
  //     street: String,
  //     city: String,
  //   }, //? This way address field won't get any _id Object field automatically.
  address: addressSchema, //? This way address field WILL get an _id Object field automatically.
});

module.exports = { userSchema, addressSchema };
```

## Setting validations on fields in Schema:

### 👉 Requiring a field in Schema; and auto lowercasing/uppercasing:

```js
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: {
    type: String, /* Just a longer verison of { email: String }, but for adding other fields like "required" */
    required: true,
    lowercase: true, /* for automatic lowercasing the string */,
    uppercase: true, /* for automatic uppercasing the string, from these 2 either anyone of the both should be mentioned only, if both are written one after other then the FIRST one will take priority, "lowercase" in this case. */,
  },
});
```

### 👉 Default fields (Static and Dynamic):

```js
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  createdAt: {
    type: Date,
    default: Date.now(), // fine for static data like Strings (name, email) or numbers (age) etc, but not for dynamic datas like Date that has to be updated everytime the model has been called.
    default: () => Date.now(), // Now will be called implicitly everytime the model is being called.
  },
});
```

### 👉 Immutable Flag 🏳️:

```js
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true, // now implicitly being ignored by mongoose if someone tries to set this field from anywhere like "user.createdAt = 5;" will be ignored by mongoose, won't give any error.
  },
});

// Now if we try to mutate "createdAt" field "like this only" then mongoose won't let it change and simply ignores it:
user.createdAt = 5;
await user.save();

// But it'll still change if received from body and created like this:
User.create(req.body).then((user) =>
  console.log(
    `User ${JSON.stringify(
      user
    )} is created and if user.createdAt is received in the body then it also got created!`
  )
);
// Why this happened? Because it was still CREATED (not changed) first time and not mutated after, whereas in previous code firstly date was created by default due to not provided in body and then we were trying to mutate the value, which was ignored by mongoose.
```

So the `immutable` flag doesn't sets the field being non mutable from the very beginning, it's just for not letting **re-assignment** of the CREATED field (whether created by default using `default` field in Schema or provided from body).

# Hence proved `immutable` field doesn't depends on `default` field.

### 👉 min/max 🔽🔼:

```js
const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1, // setting minimum range
    max: 100, // and minimum range
  },
});
```

### 👉 Setting Custom Validation ✅:

```js
const userSchema = new mongoose.Schema({
  evenNumber: {
    type: Number,
    validate: {
      validator: (n) => !(n % 2), // Should always return Boolean, which will throw error on returning false.
      message: ({ type, path, value }) => `${value} is not an even number`, // will be shown when error occurs.
    },
  },
});
```

> **Note:** Now the problem arises that these Schema Validations only works while **creating** documents but not while modifying them using `updateOne`, `updateMany`, `deleteOne` and `deleteMany`. That's why always use `User.findById().save()` method to pass each REST method received data through Schema Validations.

---

## Making Models 📐:

```js
const mongoose = require("mongoose");
const { userSchema } = require("../schemas/User");

module.exports = mongoose.model("User", userSchema);
```

## Using Models:

Can be used in any modification method like `POST`, `PUT`, `PATCH` and `DELETE`:

Either `new User(<document_body>)` constructor method or `User.create(<document_body>)` method.

```js
reqQuery();
async function reqQuery() {
  try {
    const user = new User({ name: "Gagandeep Singh", age: 25 }); // Not saved to the DB yet.
    await user.save(); // saved into DB.

    // ---------------- OR ----------------
    // ######################## Used majority times: ########################
    const user = await User.create({ name: "Gagandeep Singh", age: 25 }); // Created new Document and also saved into the DB.

    // If want to modify manually before or after saving:
    user.name = "John Doe";
    await user.save();
  } catch (error) {
    console.error(error.message); // can occur when there's datatype invalidation error that datatype of provided field isn't matching with the field defined in schema, or mongoose couldn't type-cast the value implicitly, like "3" -> 3, but "h" -> NAN.
  }
}
```

    // Output:
    {
        name: "Gagandeep Singh",
        age: 25,
        _id: new ObjectId("65absomething..."),
        __v: 0 // this field created by mongoose for tracking the version for it's own purpose
    }

## Queries 🔍❓

### Query Methods:

1. `findById(<ObjectId(...)>)`:

```js
const user = await User.findById("6909b3fdcc2bec725277cc19");
```

2. `find() || find(<filter>)`: just like mongosh, will return whole collection (Array) of docs
3. `findOne(<filter>)`: just like mongosh, returns first occurance doc only.
4. `exists(<filter>)`: returns Boolean. If found, true; else false.
5. ❌`updateOne(<filter>)`: same as mongosh, but don't use this as it doesn't validates from Schema.
6. `deleteOne(<filter>)`: same as mongosh, deletes one first occurance doc, returns `{ deletedCount: 1 }` if found.
7. `deleteMany(<filter>)`: same as mongosh, deletes all docs with matched filter.

### Actual Queries:

Can be used with all combinations of queries to find anything from DB:

#### 1. `User.where(<field_name>)`

1. **.equals()**: `User.where(<field_name>).equals(<value>)`: **Usage Example**:

```js
const users = await User.where("name").equals("Gagandeep");
console.log(users); //? Output: [{ name: "Gagandeep", ... }, ...]  // will give all docs matching the filter.
```

2. **.gt()**: `User.where(<field>).gt(<value>)`: **Usage Example**:

```js
const users = await User.where("age").gt("12");
console.log(users); //? Output: [{ name: "Gagandeep", ... }, ...]  // will give all docs matching the filter.
```

3. **.in()**: `User.where(<field>).in([<value1>, <value2>, ...] || string_value)`: **Usage Example**:

```js
const users = await User.where("hobbies").in(["Singing", "Dancing"]);
```

#### 2. `User.find().limit(<number>)`

```js
const users = await User.find().limit(1);
```

#### 3. `User.find().select(<field_name>)`

```js
const users = await User.find().select("name");
```
