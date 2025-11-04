# RSC (React Server Components)

Server Comps are different from SSR:

- SSR only happens once on the server when requested, and then server ships the HTML rendered code to the browser, which if it has interactions and 

### RSC used and provided best by:
- Nextjs
- React Router v7
- Expo (for Natives)
- TanStack Start


> **Note:** In react stand alone, it's difficult yet possible to make and use Server Components but needs dedicated node server that should render not the HTML string but something into special, *compressed binary format* called the **React Server Component Payload *(RSC Payload)*** which is then streamed to the client and then understood by the React in the browser. <br/>
Vite and CRA doesn't has capability alone to run Server Comps, needs extra setup if we want to use without any framework like Nextjs. It's like mimicing what Nextjs and other frameworks developed to adopt the RSCs.