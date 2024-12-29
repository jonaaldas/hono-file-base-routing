import { fileURLToPath } from "node:url";
import path, { dirname, join } from "path";
import fs from "node:fs";

interface Route {
  path: string;
  method: string;
  handler?: any;
}

export async function createRoutes(): Promise<Route[]> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const dirArray = fs.readdirSync(__dirname);
  const routes: Route[] = [];

  async function generateRoutes(dirArray: string[], currentDir: string) {
    await Promise.all(
      dirArray.map(async (route) => {
        const currentPath = path.join(currentDir, route);
        if (!currentPath.includes("/api")) {
          return;
        }

        if (path.extname(route)) {
          const fullPath = path.join(currentDir, `${route}`);
          const apiIndex = fullPath.indexOf("/api");
          const trimmedPath = fullPath.slice(apiIndex);
          const relativePath = trimmedPath.replace(".ts", "");
          const importPath = await import(`.${trimmedPath}`);
          let routeObj: Route = {
            path: relativePath,
            method: "GET",
            handler: importPath,
          };
          routes.push(routeObj);
          return;
        }

        const nextPath = join(currentDir, route);
        const pathArray = fs.readdirSync(nextPath);
        await generateRoutes(pathArray, nextPath);
      })
    );
  }

  await generateRoutes(dirArray, __dirname);
  return routes;
}
