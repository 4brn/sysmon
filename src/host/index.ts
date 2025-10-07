import type { ServerWebSocket } from "bun";
import { get } from "systeminformation";
import { template } from "./template";

let interval: NodeJS.Timeout;
const clients = new Set<ServerWebSocket<unknown>>();

const server = Bun.serve({
  port: 3000,
  routes: {
    "/ws": (req) => {
      if (server.upgrade(req)) return;
      return new Response("Upgrade Failed", { status: 400 });
    },
  },
  websocket: {
    open(ws) {
      console.log("connection opened");
      clients.add(ws);

      interval = setInterval(async () => {
        const data = await get(template);

        for (const socket of clients) {
          socket.send(JSON.stringify(data));
          console.log(`sent data to client`);
        }
      }, 10000);
    },
    message(ws) {},
    close(ws) {
      clients.delete(ws);
      clearInterval(interval);
      console.log("connection closed");
    },
  },
  fetch(req, server) {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Listening on http://localhost:${server.port}`);

// graceful process interrupt
process.on("SIGINT", async () => {
  clearInterval(interval);
  clients.clear();
  await server.stop(true);
  console.log("Server stopped gracefully");
  process.exit();
});
