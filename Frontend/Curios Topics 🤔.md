# 1. App Router fetch Caching mechanism and topics.
# 2. Fetching data directly from DB in an App router's Server Component.
```js
import { sql } from '@vercel/postgres';

export default async function Posts() {
    const { rows } = await sql`SELECT * FROM users`;
    console.log(rows);

    return <>{rows.map((item)=>item.name)}</>
}
```