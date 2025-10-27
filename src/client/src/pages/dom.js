export function update(element, content) {
  element.textContent = content;
}

export function insert(key, value, parent) {
  const div = document.createElement("div");
  const label = document.createElement("strong");
  const info = document.createElement("span");

  div.setAttribute("role", "group");
  div.classList.add("info-box");

  label.classList.add("label");
  label.textContent = key;

  info.classList.add("info");
  info.textContent = value;

  div.append(label, info);
  parent.append(div);
}

export const dom = {
  time: {
    // dynamic
    current: document.getElementById("time.current"),
    uptime: document.getElementById("time.uptime"),
    timezone: document.getElementById("time.timezone"),
    timezoneName: document.getElementById("time.timezoneName"),
  },
  system: {
    // static
    model: document.getElementById("system.model"),
    vendor: document.getElementById("system.vendor"),
    virtual: document.getElementById("system.virtual"),
  },
  bios: {
    // static
    vendor: document.getElementById("bios.vendor"),
    version: document.getElementById("bios.version"),
  },
  os: {
    // static
    platform: document.getElementById("os.platform"),
    distro: document.getElementById("os.distro"),
    kernel: document.getElementById("os.kernel"),
    arch: document.getElementById("os.arch"),
  },
  cpu: {
    // static
    vendor: document.getElementById("cpu.vendor"),
    model: document.getElementById("cpu.model"),
    cores: document.getElementById("cpu.cores"),
    threads: document.getElementById("cpu.threads"),

    // dynamic
    usage: document.getElementById("cpu.usage"),
    temperature: document.getElementById("cpu.temperature"),
    speed: document.getElementById("cpu.speed"),
    coreSpeeds: document.getElementById("cpu.coreSpeeds"),
  },
  mem: {
    total: document.getElementById("mem.total"),

    //dynamic
    active: document.getElementById("mem.active"),
  },
  battery: {
    // dynamic
    percentage: document.getElementById("battery.percentage"),
    voltage: document.getElementById("battery.voltage"),
  },
  processes: {
    // dynamic
    all: document.getElementById("processes.all"),
    sleeping: document.getElementById("processes.sleeping"),
    list: document.getElementById("processes.list"),
  },
  disks: {
    read: document.getElementById("disks.read"),
    write: document.getElementById("disks.write"),
    layouts: document.getElementById("disks.layouts"),
  },
  network: {
    list: document.getElementById("network.list"),
  },
  users: {
    // dynamic
    list: document.getElementById("users.list"),
  },
};

export function renderStatic(data) {
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
  update(dom.mem.total, Math.round(data.mem.total / 1_000_000_000));

  // battery
  if (!data.battery.hasBattery) {
    document.getElementById("battery-container").style.display = "none";
  }

  // disks.layout
  data.disks.layouts.forEach((disk) => {
    const dropdown = document.createElement("details");

    const text = document.createElement("summary");
    text.setAttribute("role", "button");
    text.classList.add("secondary", "outline");
    text.textContent = disk.device;
    dropdown.append(text);

    insert("Device", disk.device, dropdown);
    insert("Type", disk.deviceType, dropdown);
    insert("Manufacturer", disk.vendor, dropdown);
    insert("Model", disk.name, dropdown);
    insert("Size", Math.round(disk.size / 1_000_000_000) + " GB", dropdown);

    dom.disks.layouts.append(dropdown);
  });
}

export function renderDynamic(data) {
  const time = new Date(data.time.current);
  let upTime = data.time.uptime / 60;
  // time
  update(dom.time.current, time.toLocaleTimeString());

  const minutes = Math.floor(upTime % 60);
  upTime /= 60;
  const hours = Math.floor(upTime % 24);
  upTime /= 24;
  const days = Math.floor(upTime);
  update(dom.time.uptime, `${days}d ${hours}h ${minutes}m`);

  update(dom.time.timezoneName, data.time.timezoneName);
  update(dom.time.timezone, data.time.timezone);

  // users
  dom.users.list.innerHTML = "";
  data.users.forEach((user) => {
    const row = document.createElement("tr");
    const username = document.createElement("th");
    const ip = document.createElement("th");
    const time = document.createElement("th");
    const date = document.createElement("th");

    username.setAttribute("scope", "row");
    username.textContent = user.username;

    ip.textContent = user.ip;
    time.textContent = user.login.time;
    date.textContent = user.login.date;

    row.append(username, ip, time, date);
    dom.users.list.append(row);
  });

  // cpu
  update(dom.cpu.usage, Math.round(data.cpu.usage * 10) / 10 + " %");
  update(dom.cpu.temperature, data.cpu.temperature + " °C");
  update(dom.cpu.speed, data.cpu.speed.average + " GHz");

  dom.cpu.coreSpeeds.innerHTML = "";
  for (let i = 0; i < data.cpu.speed.cores.length; i++) {
    const row = document.createElement("tr");
    const core = document.createElement("th");
    const speed = document.createElement("th");

    core.setAttribute("scope", "row");
    core.textContent = `Core ${i + 1}`;

    speed.textContent = data.cpu.speed.cores[i];

    row.append(core, speed);
    dom.cpu.coreSpeeds.append(row);
  }

  // memory
  update(
    dom.mem.active,
    Math.round((data.mem.active / 1_000_000_000) * 100) / 100,
  );

  // battery
  update(dom.battery.percentage, data.battery.percentage);
  update(dom.battery.voltage, Math.round(data.battery.voltage * 100) / 100);

  // processes
  update(dom.processes.all, data.processes.all);
  update(dom.processes.sleeping, data.processes.sleeping);

  dom.processes.list.innerHTML = "";
  data.processes.list.forEach((process) => {
    const row = document.createElement("tr");
    const pid = document.createElement("th");
    const name = document.createElement("td");
    const user = document.createElement("td");
    const mem = document.createElement("td");
    const cpu = document.createElement("td");
    const state = document.createElement("td");

    pid.setAttribute("scope", "row");
    update(pid, process.pid);

    update(name, process.name);
    update(user, process.user);
    update(mem, Math.round(process.mem * 100) / 100);
    update(cpu, Math.round(process.cpu * 100) / 100);
    update(state, process.state);

    row.append(pid, name, user, mem, cpu, state);
    dom.processes.list.append(row);
  });

  // disks
  update(dom.disks.read, Math.round(data.disks.read * 100) / 100);
  update(dom.disks.write, Math.round(data.disks.write * 100) / 100);

  // networks
  dom.network.list.innerHTML = "";
  data.network.interfaces.forEach((iface) => {
    const stats = data.network.stats.filter((i) => i.iface === iface.iface);

    const row = document.createElement("tr");
    const netIface = document.createElement("th");
    const ip = document.createElement("td");
    const subnet = document.createElement("td");
    const mac = document.createElement("td");
    const recieved = document.createElement("td");
    const transfered = document.createElement("td");

    netIface.setAttribute("scope", "row");

    update(netIface, iface.iface);
    update(ip, iface.ip4);
    update(subnet, iface.ip4subnet);
    update(mac, iface.mac);
    update(recieved, stats.recieved || 0);
    update(transfered, stats.transfered || 0);

    row.append(netIface, ip, mac, subnet, recieved, transfered);
    dom.network.list.append(row);
  });
}
