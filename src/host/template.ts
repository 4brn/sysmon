export const template = {
  system: "model, manufacturer, virtual",
  bios: "vendor, version",
  osInfo: "platform, distro, kernel, arch, hostname",
  users: "user, time, ip",
  cpu: "manufacturer, brand, physicalCores, cores",
  cpuCurrentSpeed: "min, avg, max",
  cpuTemperature: "main",
  currentLoad: "currentLoad",
  mem: "total, active",
  battery: "hasBattery, voltage, percent",
  processes: "all, running, blocked, sleeping", // A lot of data
  // processLoad: "proc, pid", // A lot of data
  diskLayout: "device, type, name, vendor, size",
  networkInterfaces: "iface, ip4, ip4subnet, ip6, ip6subnet, mac",
  networkStats: "iface, operstate, rx_sec, tx_sec",
  wifiNetworks: "ssid, bssid",
  wifiInterfaces: "iface, model, vendor, mac",
};
