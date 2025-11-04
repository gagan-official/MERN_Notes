Date: 09 Oct 2025 : -
-

### 1. React vs Nextjs ✅
### 2. React.createElement and React with ES6 ✅
### 3. Drawbacks of using CRA ✅
### 4. Next Navigations strategies to avoid Reloading ✅
1. Deep dive in behavior of Link component, **`prefetch`** property and `null`, `false` and `true` values ✅
2. How Nextjs renders navigated routes without reloading while it has generated html page of that route? ✅ (by using hybrid system as on first FCP it serves the html page but on Client Side Navigation it does SPA like navigation just like in RRD using only `<Link>` component, preventing reloading and adding navigated route in history stack, and fetching JS bundle for that page as component.)

### 5. Common Causes of Hydration Error ✅
1. html order mismatch
2. Date()
3. Math.random()
4. async apis that generates random datas
5. web APIs written in Server Comp

### 6. React Server Components (RSC) vs Server Side Rendering (SSR) 🚧
> **Note:** Has to understand the Pages router first to understand this deeply.

### 7. Pages Router vs App Router in Nextjs 🚧
Pages | Router
-|-
All were Client Comps by default | All are Server Comps by default (introduced with React 18)
SSG needs to use `getStaticProps()` function | SSG is by default
File based routing | Folder based routing
Server Side Data Fetching done in page level functions <br> only `getServerSideProps`, `getStaticProps`, etc. | Server side Data fetching can be done inside page component itself (SSG).
_app.js and _document.js handles layouting | layout.js and template.js are newly introduced,<br> replacing _app and _document.

### 8. Can we use a for loop in JSX ?
No, JSX in curly brackets {} should always have any expression that returns a single value of any Datatype, it can be logical, comparison or ternary oprations, function calls _(can be a arrow function or function expression in case of Formik, have to clarify more)_, a variable or lastly a value.

---

Date: 10 Oct 2025 : -
-

### 1. Pages Router: 
1. Architecture. ✅
1. Routing System. ✅
1. getStaticProps (router.query.<param>). ✅

### 2. React Class Components:
1. `this.state` ✅
1. `this.setState` ✅
1. `this.props` ✅

### 3. Pure Components:
1. `React.memo()` ✅

### 4. Custom Hooks:
1. Why to use 'use' prefix (`eslint-plugin-react-hooks`) ✅
1. Custom hook to fetch data ? ✅


---

Date: 14 Oct 2025 : -
-
### useEffect vs useLayoutEffect? ✅
### useLayoutEffect use cases? ✅
Can be used in calculating exact height or width of a button and then assigning position to the tooltip or context menu/popup next to button **right before the browser paint** to prevent visual flash or flicker.

### When can we use useRef to create a form and when can we use useState to create a form? ✅
- Use `useRef` (uncontrolled component) when it's needed to reduce rerenderings and submit all values at once, **and file inputs must be handled via refs**.
- Use `useState` (controlled component) when there's need to show password validation instantly and other scenarios like this.


---

Date: 16 Oct 2025 : -
-

### RESTful CRUD operations and MVC Pattern ✅

---

Date: 22 Oct 2025 : -
-

### JWT Authentication and Authorisation