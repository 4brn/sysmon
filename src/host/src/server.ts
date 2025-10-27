import { serve } from "bun";
import { getStaticData, getDynamicData } from "./data";
import figlet from "figlet";
import type { SysmonResponse } from "shared/types";

let clients = 0;
const delay = 60000;
const port = 3000;
const isProd = process.env.BUILD === "production";

// seed buffer with information for faster first response
const buffer: { static: string; dynamic: string } = {
  static: "",
  dynamic: "",
};

const server = serve({
  port: port,
  hostname: "0.0.0.0",
  development: isProd ? false : true,

  routes: {
    "/": (req) => {
      if (server.upgrade(req)) return;
      return new Response("Upgrade Failed", { status: 400 });
    },
  },

  websocket: {
    async open(ws) {
      ws.subscribe("stream");
      clients++;

      console.log(`client connected [${clients}]:`, ws.remoteAddress);

      let date = new Date().toLocaleString();
      console.time(`[STATIC] ${date}`);
      ws.send(buffer.static);
      console.timeEnd(`[STATIC] ${date}`);

      date = new Date().toLocaleString();
      console.time(`[DYNAMIC] ${date}`);
      ws.send(
        JSON.stringify({ type: "dynamic", data: await getDynamicData() }),
      );
      console.timeEnd(`[DYNAMIC] ${date}`);
    },

    async message(ws, message) {
      const date = new Date().toLocaleString();
      switch (message) {
        case "dynamic":
          console.time(`[DYNAMIC] ${date}`);
          ws.send(
            JSON.stringify({ type: "dynamic", data: await getDynamicData() }),
          );
          console.timeEnd(`[DYNAMIC] ${date}`);
          break;
        case "kill":
          ws.send("server killed");
          console.log(`[KILL] [${ws.remoteAddress}] ${date}`);
          process.kill(process.pid, "SIGINT");
          break;
      }
    },

    close(ws) {
      clients--;
      console.log(`connection closed [${clients}]:`, ws.remoteAddress);
    },
  },

  fetch(req, server) {
    return new Response("Not Found", { status: 404 });
  },
});

const scrapeInterval = setInterval(async () => {
  if (clients < 1) return;

  const date = new Date().toLocaleString();

  console.time(`[DYNAMIC] ${date}`);
  const data = JSON.stringify({
    type: "dynamic",
    data: await getDynamicData(),
  } as SysmonResponse);
  server.publish("stream", data);
  console.timeEnd(`[DYNAMIC] ${date}`);
}, delay);

// graceful process interruption
process.on("SIGINT", async () => {
  clearInterval(scrapeInterval);
  await server.stop(true);
  console.log("Server killed gracefully");
  process.exit();
});

console.clear();
console.log(
  figlet.textSync("sysmon", { font: "Poison", width: 80 }),
  `\nListening on ${server.url}`,
  `\nRate: ${delay / 1000} sec`,
  `\n\n--- Logs ---\n`,
);

buffer.static = JSON.stringify({
  type: "static",
  data: await getStaticData(),
} as SysmonResponse);
console.log("buffer seeded");
