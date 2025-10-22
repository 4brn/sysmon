import { getStaticData, getDynamicData } from "./data";
import figlet from "figlet";

const delay = 10000;
const port = 3000;
let scrapping = false;

enum TYPES {
  static = "static",
  dynamic = "dynamic",
}
const buffer: { static: string; dynamic: string } = {
  static: "",
  dynamic: "",
};

menu();

const server = Bun.serve({
  port: port,
  hostname: "0.0.0.0",
  development: true,

  routes: {
    "/": (req) => {
      if (server.upgrade(req)) return;
      return new Response("Upgrade Failed", { status: 400 });
    },
  },

  websocket: {
    async open(ws) {
      ws.subscribe("stream");
      scrapping = true;
      console.log("client connected:", ws.remoteAddress);

      const date = new Date().toLocaleString();
      console.time(`[STATIC] ${date}`);
      ws.send(buffer.static);
      console.timeEnd(`[STATIC] ${date}`);

      console.time(`[DYNAMIC] ${date}`);
      ws.send(buffer.dynamic);
      console.timeEnd(`[DYNAMIC] ${date}`);
    },

    async message(ws, message) {
      const date = new Date().toLocaleString();
      switch (message) {
        case "static":
          console.time(`[STATIC] ${date}`);
          const data = JSON.stringify({
            type: TYPES.static,
            data: await getStaticData(),
          });
          ws.send(data);
          console.timeEnd(`[STATIC] ${date}`);

          buffer.static = data;
          break;

        case "kill":
          console.log(`[KILL] [${ws.remoteAddress}] ${date}`);
          process.kill(process.pid, "SIGINT");
          break;
      }
    },

    close(ws) {
      scrapping = false;
      console.log("connection closed:", ws.remoteAddress);
    },
  },

  fetch(req, server) {
    return new Response("Not Found", { status: 404 });
  },
});

const scrapeInterval = setInterval(async () => {
  if (!scrapping) return;
  const date = new Date().toLocaleString();

  console.time(`[DYNAMIC] ${date}`);
  const data = JSON.stringify({
    type: TYPES.dynamic,
    data: await getDynamicData(),
  });
  server.publish("stream", data);
  console.timeEnd(`[DYNAMIC] ${date}`);

  buffer.dynamic = data;
}, delay);

// graceful process interruption
process.on("SIGINT", async () => {
  clearInterval(scrapeInterval);
  await server.stop(true);
  console.log("Server killed gracefully");
  process.exit();
});

function menu() {
  console.clear();
  console.log(
    figlet.textSync("sysmon2", { font: "Poison", width: 80 }),
    `\nListening on http://localhost:${port}\nRate: ${delay / 1000} sec\n\n--- Logs ---\n`,
  );
}

// seeding speeds up first websocket transfer when connected
// for a initial startup delay
const seedBuffer = async () => {
  buffer.static = JSON.stringify({
    type: TYPES.static,
    data: await getStaticData(),
  });
  buffer.dynamic = JSON.stringify({
    type: TYPES.dynamic,
    data: await getDynamicData(),
  });

  console.log("seeded buffer");
};

seedBuffer();
