# About Foreign Key:

### Why do we even need Foreign keys:
1. Foreign Keys are the only reason to make **JOINS** possible.
2. Foreign Keys are the only ones to maintain relation b/w the tables.
3. When set to any Child Table, it enforces **Referential Integrity**
4. **Parent Table**: Referenced Table (PK)
5. **Child Table**: Referencing Table (FK)

## ***Referential Integrity
Rule that ensures relationship remains consistent, valid and accurate **(** not to allow `null` FKs in Child Table, preventing orphan records without having the `null` FKs **)**.

### Enforcing Referencial Integrity in CUD : Insert (Create), Update and Delete.
1. **Insert**: won't let to insert any record without valid FK which should be present as exact matching value in Parent Table as PK.
2. **Update**: won't let to update PK in Parent Table to avoid orphan records in Child Tables, unless any **actions** are defined (eg. `CASCADE`).
3. **Delete**: won't let to delete any record in Parent Table if Child Table has any related record exists, unless any **actions** are defined.h