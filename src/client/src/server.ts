import { serve } from "bun";
import index from "./pages/index.html";

const isProd = process.env.BUILD === "production";

const server = serve({
  hostname: "0.0.0.0",
  port: 1337,
  development: isProd ? false : true,

  routes: {
    "/*": index,
  },
});

console.clear();
console.log(`Server running at ${server.url}`);
