import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createRoutes } from "./create-routes.js";

const routes = await createRoutes();
const app = new Hono();

routes.forEach((route: any) => {
  app.on(route.method, route.path, route.handler.handler || "");
});
const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
