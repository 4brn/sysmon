import { renderDynamic, renderStatic } from "./dom";

const url = "ws://127.0.0.1:3000";
const ip = url.slice(5, url.length - 5);
let socket;

const root = document.getElementById("root");
const refreshContainer = document.getElementById("refresh-container");
const refreshButton = document.getElementById("refresh");
const connectivityButton = document.getElementById("connect");
const connectedIndicator = document.getElementById("connected");
const ipContainer = document.getElementById("ip");
const theme = document.getElementById("theme");
const dropdowns = document.getElementsByTagName("summary");

ipContainer.textContent = `@${ip}`;

refreshButton.onclick = () => socket.send("dynamic");
connectivityButton.onclick = () => connect(url);

theme.onclick = () => {
  const theme = root.getAttribute("data-theme") === "light" ? "dark" : "light";

  root.setAttribute("data-theme", theme);
};

for (const el of dropdowns) {
  el.setAttribute("aria-busy", "true");
}

function connect(url) {
  socket = new WebSocket(url);
  socket.onopen = (event) => {
    console.log("[open] connection");
    connectedIndicator.style.backgroundColor = "lightgreen";

    refreshContainer.toggleAttribute("hidden");

    connectivityButton.textContent = "Disconnect";
    connectivityButton.onclick = () => socket.close();
  };

  socket.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data);
    switch (type) {
      case "static":
        renderStatic(data);
        break;
      case "dynamic":
        renderDynamic(data);

        for (const el of dropdowns) {
          el.setAttribute("aria-busy", "false");
        }
        break;
    }

    console.log("[message]", data);
  };

  socket.onclose = (event) => {
    console.log("[close] connection");

    connectedIndicator.style.backgroundColor = "red";

    refreshContainer.toggleAttribute("hidden");

    connectivityButton.textContent = "Connect";
    connectivityButton.onclick = () => connect(url);
  };

  socket.onerror = (error) => {
    console.log(`[error]`, error);
  };
}

console.clear();
