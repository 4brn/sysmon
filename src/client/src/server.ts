import { serve } from "bun";
import index from "./pages/index.html";
import notFound from "./pages/404/index.html";

console.clear();

const isProd = process.env.BUILD === "production";

const server = serve({
  hostname: "0.0.0.0",
  port: 1337,
  development: isProd ? false : true,

  routes: {
    "/": index,
    "/*": notFound,
  },
});

// graceful process interruption
process.on("SIGINT", async () => {
  await server.stop(true);
  console.log("Server killed gracefully");
  process.exit();
});

console.log(`Server running at ${server.url}`);
