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
# 3. Time Slicing and Lane Model
# 4. Normal Batching (older versions) and Automatic Batching (since React 18)
In older versions, react Batches updates in only single event handler (eg: inside `onClick`). In v18 and afterwards, it does **Automatic Batching**, means updates are are batched across _promises, timeouts, and native event handlers_ as well.