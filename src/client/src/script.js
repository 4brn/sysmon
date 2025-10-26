// import type { DynamicData, StaticData } from "shared/types";
import template from "../../../static.json";
console.clear();

const dom = {
  system: {
    model: document.getElementById("system.model"),
    vendor: document.getElementById("system.vendor"),
    virtual: document.getElementById("system.virtual"),
  },
  bios: {
    vendor: document.getElementById("bios.vendor"),
    version: document.getElementById("bios.version"),
  },
  os: {
    platform: document.getElementById("os.platform"),
    distro: document.getElementById("os.distro"),
    kernel: document.getElementById("os.kernel"),
    arch: document.getElementById("os.arch"),
  },
  cpu: {
    vendor: document.getElementById("cpu.vendor"),
    model: document.getElementById("cpu.model"),
    cores: document.getElementById("cpu.cores"),
    threads: document.getElementById("cpu.threads"),
  },
  mem: {
    total: document.getElementById("mem.total"),
  },
  disks: {
    layouts: document.getElementById("disks.layouts"),
  },
};

const url = "ws://localhost:3000";

function renderStatic(data) {
  function update(element, content) {
    element.textContent = content;
  }

  // system
  update(dom.system.model, data.system.model);
  update(dom.system.vendor, data.system.vendor);
  update(dom.system.virtual, data.system.virtual);

  // bios
  update(dom.bios.vendor, data.bios.vendor);
  update(dom.bios.version, data.bios.version);

  // os
  update(dom.os.platform, data.os.platform);
  update(dom.os.distro, data.os.distro);

  //cpu
  update(dom.cpu.vendor, data.cpu.vendor);
  update(dom.cpu.model, data.cpu.model);
  update(dom.cpu.cores, data.cpu.cores);
  update(dom.cpu.threads, data.cpu.threads);

  //mem
  update(dom.mem.total, Math.floor(data.mem.total / 1_000_000_000));

  // battery
  if (!data.battery.hasBattery) {
    document.getElementById("battery-container").style.display = "none";
  }

  // disks.layout
  data.disks.layouts.forEach((disk) => {
    const accordion = document.createElement("details");
    const summary = document.createElement("summary");
    summary.setAttribute("role", "button");
    summary.classList.add("secondary");

    const device = document.createElement("strong");
    device.textContent = "Device";
    device.classList.add("label");

    const vendor = document.createElement("strong");
    vendor.textContent = "Manufacturer";
    vendor.classList.add("label");

    const name = document.createElement("strong");
    name.textContent = "Model";
    name.classList.add("label");

    const size = document.createElement("strong");
    size.textContent = "Capacity";
    size.classList.add("label");

    for (const key in disk) {
      const container = document.createElement("div");
      container.setAttribute("role", "group");
      container.classList.add("info-box");

      const info = disk[key];
      const infoContainer = document.createElement("span");
      infoContainer.classList.add("info");
      infoContainer.textContent = info;

      switch (key) {
        case "device":
          summary.textContent = info;
          accordion.append(summary);
          container.append(device);
          break;
        case "name":
          container.append(name);
          break;
        case "vendor":
          container.append(vendor);
          break;
        case "size":
          infoContainer.textContent = Math.floor(info / 1_000_000_000) + " GB";
          container.append(size);
      }

      container.append(infoContainer);
      accordion.append(container);
    }

    dom.disks.layouts.append(accordion);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("theme").addEventListener("click", () => {
    const root = document.getElementById("root");
    const theme =
      root.getAttribute("data-theme") === "light" ? "dark" : "light";

    root.setAttribute("data-theme", theme);
  });

  const dropdowns = document.getElementsByTagName("summary");
  for (const el of dropdowns) {
    el.setAttribute("aria-busy", "true");
  }

  let socket = new WebSocket(url);

  socket.onopen = (event) => {
    console.log("[open] connection");
  };

  socket.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data);
    switch (type) {
      case "static":
        renderStatic(data);
        break;
      case "dynamic":
        break;
    }

    for (const el of dropdowns) {
      el.setAttribute("aria-busy", "false");
    }
    console.log("[message]", data);
  };

  socket.onclose = (event) => {
    console.log("[close] connection");
  };

  socket.onerror = (error) => {
    console.log(`[error]`, error);
    console.log("[retry] connection");
    setTimeout(() => {
      socket = new WebSocket(url);
    }, 5000);
  };
});
