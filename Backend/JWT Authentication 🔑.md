## Stateful and Stateless Mechanism

- **Stateful** means keys or tokens can be stored in DB, -> so user can access only 1 website/server/service if logged in, and other like 2 websites/servers/services available couldn't be accessed as it was stateful at only one backend, and have to create again separately for both of the rest websites/servers/services. **Eg**: `Sessions`
- **Stateless** means private keys will be stateless (have to be more clear for this concept) -> so user once loggedin in one website/server/service, can access multiple websites/servers/services if they all internally share same JWT secret key, making the authentication Stateless. **Eg**: `JWT`

### JWT is **Stateless**.
But we can make it Partially stateful using Refresh Tokens and storing them in DB

### Authentication vs Authorization

**Authentication**: To authenticate a user is he's the right person or not to access all the resources/pages.
**Authorization**: To authenticate a user is he's the right person or not to access specific pages; if he's authorized to access those specific resources/pages.

### JWT vs Sessions

- **Sessions** are needed to be stored in either DB or in Redis(a type of storage) to access repeatedly the `Session ID` to Authenticate the request came, which makes them `stateful`.
- **JWT** aren't stored anywhere (being generated and sent to client to let them store and send with each RESTful requests) but their copy as `refreshToken` being stored in the DB to access it whenever the `accessToken` (current JWT token) to Authenticate the request came.

### JWT can be sent inside response body or in cookies whether normal or with `httpOnly` flag.

Steps:

**Advantage of Cookies (both with and without `httpOnly` flag):** <br>

|                 | ✅ On same origin (both client and server are on app.com, using **Same Origin Policy**) | 🔴 On different origins (client: `app.com`, server: `api.app.com`, using **Same Origin Policy**)                                  |
| --------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Client Side** | Are being sent Automatically with every request from Client Side.                       | Has to set `{ credentials: true }` in fetch API or `{ withCredentials: true }` in axios for being sent with the specific request. |
| **Server Side** | No `CORS` credentials required.                                                         | `CORS` must be set with `credentials: true` in options.                                                              nor             |
| **`httpOnly` flag** | Can't be accessible and mutable by Client side. | 