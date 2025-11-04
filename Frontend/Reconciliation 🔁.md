# Reconciliation:

It is the whole process which react used to track and update only minimilistic required changes into the browser:

1. Makes 2 copies of Real `DOM` of browser they call it as **Virtual DOM**, one is for keeping previous version's track and second is for changing nodes and comparing it with previous one.
2. Then on every state change React compares differences between the changed VDOM and previous VDOM using **Diffing Algorithm**.
3. After `Diffing`, React determines the minimal changes to apply on the actual DOM.
4. Finally, React updates directly to the Real DOM *(may be updates the old VDOM as well)*.

## `Diffing Algorithm` compares both the VDOMs on the basis of:

### 1. If whole node changes at some point in tree, all it's children has to be rerendered, <br>

**Reason**: React doesn't has idea whether those children are `pure componenets` or not:

1.  What if a child has API calling which could be updated frequently at backend so it has to show newer data on every rerender.
2.  What if a child is accessing the current time and need to update in the UI with updated time. <br>

**E.g:** If changed from this:

```js
<div>
  <p>Hello World!</p>
</div>
```

to this:

```js
<section>
  <p>Hello World!</p>
</section>
```

---

### 2. If a particular property or value changed:

From this:

```js
<p className="block">Hello World!</p>
```

to this:

```js
<p className="flex">Hello World!</p>
```

---

### 3. If an array of lists are being shown:

```js
<ul>
  <li>Apple 🍎</li>
  <li>Banana 🍌</li>
  <li>Orange 🍊</li>
</ul>
```

then if a new list adds up but in random position:

```js
<ul>
  <li>Apple 🍎</li>
  <li>Avocado 🥑</li>
  <li>Banana 🍌</li>
  <li>Orange 🍊</li>
</ul>
```

Then it needs to rerender whole `ul` list, as React isn't smart enough to recognize whether the existing elements are newer or just got re-ordered. <br>
That's why `key` prop comes into the picture, that's why it's necessary to add **unique `key`** prop in array of repeating elements or say lists so that even while re-ordered, React can recognize them and not update them in newer render, resulting only adding up new element into the list at exact array location.

```js
<ul>
  <li key="li1">Apple 🍎</li>
  <li key="li2">Avocado 🥑</li>
  <li key="li3">Banana 🍌</li>
  <li key="li4">Orange 🍊</li>
</ul>
```


# React Fiber:
This is a whole new conept which is needed to study further deeply.