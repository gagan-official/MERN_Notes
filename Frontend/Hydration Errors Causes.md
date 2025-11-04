### Common Causes of Hydration Errors:

1. Using `Date()` constructor in JSX:
```jsx
<p>Current Time: {new Date().toLocaleTimeString()}</p>
```
This will render slightly ahead of time in client than it was rendered on server.

---

2. Using `Date()` constructor in JSX:
```jsx
<p>Current Time: {new Date().toLocaleTimeString()}</p>
```
This will render slightly ahead of time in client than it was rendered on server.

3. Using `Math.random()` in JSX:
```jsx
<p>Random Number: {Math.random()}</p>
```
This will render random numbers on both server and client side.

4. Using `window` object or any other web api to conditionally render in JSX:
```jsx
// This component is rendered on the server first
export default function MyComp() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768; // window is undefined on server
  return <p>Device Type: {isMobile ? 'Mobile' : 'Desktop'}</p>;
}
```

protected and private routes