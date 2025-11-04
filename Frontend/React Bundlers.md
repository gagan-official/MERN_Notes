### CRA uses `webpack`:

webpack doesn't alone does eveything under the hood, unlike vite it also uses tools:

1. `babel`: for compiling/transpiling jsx/tsx,
2. `webpack-dev-server`: for dev server and HMR (hot module reload), but if changed only one line then it rebuilds whole app, making webpack slower, and
3. `webpack`: uses itself to bundle for prod.

### `Vite` creates React-App faster

but nowadyas Vite (can be called as **Bundle Tool**) provides creating many apps including react, which uses under the hood these tools:

1. `ESBuild`: (written in Go) for compiling only changed lines in dev mode.
2. Serves `ESM` files directly to browser, making it faster.
3. `Rollup`: for bundling the app.

### `Next.js` uses Turbopack since v13+ rather than Webpack

- made by Nextjs itself, written in `Rust`, used for only bundling the app in prod mode,
- Nextjs uses `SWC` (Speedy Web Compiler, ***Babel alternative***) for compiling/transpiling JSX/TSX (TSX files are not typed checked but are converted in plain JS, and in parallel runs `tsc` for type-checking, same process Babel performs for type-checking in TSX files)

