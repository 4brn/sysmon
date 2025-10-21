import type { ServerWebSocket } from "bun";
import { getStaticData, getDynamicData } from "./data";
import figlet from "figlet";

const delay = 10000;
const clients = new Set<ServerWebSocket<unknown>>();

let interval: NodeJS.Timeout;
let scrapping = false;

const server = Bun.serve({
  port: 3000,
  hostname: "0.0.0.0",
  development: false,

  routes: {
    "/stop": {
      POST: (req) => {
        process.kill(process.pid, "SIGINT");
        return new Response("Server stopped");
      },
    },

    "/dynamic": (req) => {
      if (server.upgrade(req)) return;
      return new Response("Upgrade Failed", { status: 400 });
    },

    "/static": async (req) => {
      const body = req.body;
      console.log(body);
      const data = await getStaticData();
      return Response.json(data);
    },

    "/": (req): Response => {
      return new Response(
        `David is a little boy. ${server.requestIP(req)?.address}`,
      );
    },
  },

  websocket: {
    async open(ws) {
      clients.add(ws);
      scrapping = true;

      menu();
    },
    message(ws) {},
    close(ws) {
      clients.delete(ws);
      scrapping = false;

      menu();
    },
  },

  fetch(req, server) {
    return new Response("Not Found", { status: 404 });
  },
});

interval = setInterval(async () => {
  if (!scrapping) return;

  console.time("transfered data");
  const data = JSON.stringify(await getDynamicData());

  for (const socket of clients) {
    socket.send(data);
  }
  console.timeEnd("transfered data");
}, delay);

menu();

// graceful process interruption
process.on("SIGINT", async () => {
  clearInterval(interval);
  clients.clear();
  await server.stop(true);
  console.log("Server killed gracefully");
  process.exit();
});

async function menu() {
  console.clear();
  console.log(figlet.textSync("sysmon2", { font: "Poison", width: 80 }));
  console.log(
    `
Listening on http://localhost:${server.port}
Rate: ${delay / 1000} sec
Clients: ${clients.size}
`,
  );
  console.log(`--- Logs ---`);
}
