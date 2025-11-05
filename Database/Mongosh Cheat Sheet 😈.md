# Mongosh Cheat Sheet 😈

A comprehensive MongoDB queries cheat sheet is provided below, covering common operations for database, collection, and document management.

## I. Getting Started

Connect to MongoDB Shell.

```bash
mongosh
```

Show Databases.

```bash
show dbs
```

Switch/Create Database.
JavaScript

```bash
use <databaseName>
```

show collections.

```bash
show collections
```

## II. CRUD Operations (Documents)

Insert Single Document.

```JavaScript
db.<collectionName>.insertOne({ field1: "value1", field2: "value2" })
```

Insert Multiple Documents.

```JavaScript
db.<collectionName>.insertMany([{ field1: "valueA" }, { field1: "valueB" }])
```

Find All Documents.

```JavaScript
db.<collectionName>.find()
```

Find Documents with Query.

```JavaScript
db.<collectionName>.find({ field1: "value1", field2: { $gt: 10 } })
```

Find One Document.

```JavaScript
db.<collectionName>.findOne({ field1: "value1" })
```

Update Single Document.

```JavaScript
db.<collectionName>.updateOne({ field1: "oldValue" }, { $set: { field1: "newValue" } })
```

Update Multiple Documents.

```JavaScript
db.<collectionName>.updateMany({ status: "pending" }, { $set: { status: "processed" } })
```

Delete Single Document.

```JavaScript
db.<collectionName>.deleteOne({ field1: "valueToDelete" })
```

Delete Multiple Documents.

```JavaScript
db.<collectionName>.deleteMany({ status: "archived" })
```

## III. Query Operators

- Comparison Operators: `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`, `$in`, `$nin`

```JavaScript
db.users.find({ age: { $gt: 25 }, city: { $in: ["New York", "London"] } })
```

- Logical Operators: `$and`, `$or`, `$not`, `$nor`

```JavaScript
db.products.find({ $or: [{ price: { $lt: 50 } }, { category: "electronics" }] })
```

- Element Operators: `$exists`, `$type`

```JavaScript
db.logs.find({ message: { $exists: true } })
```

- Array Operators: `$all`, `$size`, `$elemMatch`

```JavaScript
db.orders.find({ items: { $size: 3 } })
```

## IV. Projections, Sorting, Limiting

Project Specific Fields.

```JavaScript
db.<collectionName>.find({}, { field1: 1, _id: 0 }) // 1 to include, 0 to exclude
```

Sort Documents.

```JavaScript
db.<collectionName>.find().sort({ field1: 1, field2: -1 }) // 1 for ascending, -1 for descending
```

Limit Results.

```JavaScript
db.<collectionName>.find().limit(10)
```

Skip Results.

```JavaScript
db.<collectionName>.find().skip(5)
```

## V. Indexing

Create Index.

```JavaScript
db.<collectionName>.createIndex({ fieldName: 1 })
```

List Indexes.

```JavaScript
db.<collectionName>.getIndexes()
```

Drop Index.

```JavaScript
db.<collectionName>.dropIndex("indexName")
```

## VI. Aggregation Framework (Basic)

Match and Group.

```JavaScript
db.<collectionName>.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: "$category", totalOrders: { $sum: 1 } } }
])
```
