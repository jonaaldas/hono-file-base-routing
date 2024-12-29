# HONO FILE BASE ROUTING

This is a simple file based routing system for hono. It's not done and it's not a good idea to use it in production. I just built it for fun and to see if I could do it.

Turns out I can and its pretty simple to do. 

## Next Steps

- [ ] Add a way to support methods in the file name ex: api/users/me.get.ts
- [ ] Add a way to support params in the file name ex: api/users/[id].get.ts
- [ ] Add a way to support middleware in the file name ex: api/users/me.middleware.ts
- [ ] Make sure its TS safe.

## How the code works

The routing system uses a recursive function `generateRoutes` that:

1. Scans the `src` directory for files and folders
2. When it finds files under the `/api` directory, it:
   - Strips the file extension (.ts)
   - Creates a route path based on the file's location
   - Imports the handler from the file
   - Adds the route to a routes array with path, method, and handler
3. For folders, it recursively repeats the process
4. Returns an array of routes that can be registered with Hono

Each route object contains:
- `path`: The API endpoint path
- `method`: HTTP method (currently defaults to GET)
- `handler`: The imported route handler function

## How to use 

Make sure to name your handler function `handler` and export it.
```ts
export function handler(c: any) {
  return new Response("this is Me");
}
```