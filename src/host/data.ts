import { get } from "systeminformation";
import template from "./template.json";

import type {
  StaticData,
  DiskLayout,
  DynamicData,
  User,
  Process,
  NetworkInterface,
  NetworkStats,
} from "./types";

// ---------  ALL DATA COLLECTED ---------
// "system": "model, manufacturer, virtual",
// "bios": "vendor, version, releaseDate",
// "osInfo": "platform, distro, kernel, arch, hostname",
// "users": "user, date, time, ip",
// "cpu": "manufacturer, brand, physicalCores, cores",
// "cpuCurrentSpeed": "min, avg, max, cores",
// "cpuTemperature": "main",
// "currentLoad": "currentLoad",
// "mem": "total, active",
// "battery": "hasBattery, voltage, percent",
// "processLoad": "proc, pid, cpu, mem",
// "diskLayout": "device, type, name, vendor, size",
// "disksIO": "rIO_sec, wIO_sec, ms",
// "networkInterfaces": "iface, ip4, ip4subnet, mac",
// "networkStats": "iface, operstate, rx_sec, tx_sec",
// "wifiNetworks": "ssid, bssid",
// "wifiConnections": "ssid",
// "wifiInterfaces": "iface, model, vendor, mac"

export async function getStaticData() {
  const data = await get(template.static);
  return {
    // system: "model, manufacturer, virtual"
    system: {
      model: data.system.model,
      vendor: data.system.manufacturer,
      virtual: data.system.virtual,
    },
    // bios: "vendor, version, releaseDate"
    bios: {
      vendor: data.bios.vendor,
      version: data.bios.version,
      release: data.bios.releaseDate,
    },
    // osInfo: "platform, distro, kernel, arch, hostname"
    os: {
      platform: data.osInfo.platform,
      distro: data.osInfo.distro,
      kernel: data.osInfo.kernel,
      arch: data.osInfo.arch,
      hostname: data.osInfo.hostname,
    },
    // cpu: "manufacturer, brand, physicalCores, cores"
    cpu: {
      vendor: data.cpu.manufacturer,
      model: data.cpu.brand,
      cores: data.cpu.physicalCores,
      threads: data.cpu.cores,
    },
    // mem: "total"
    mem: {
      total: Math.floor(data.mem.total),
    },
    // battery: "hasBattery"
    battery: {
      hasBattery: data.battery.hasBattery,
    },
    // diskLayout: "device, type, name, vendor, size"
    disks: {
      layouts: data.diskLayout.map((dev: DiskLayout) => {
        return {
          device: dev.device,
          deviceType: dev.type,
          name: dev.name,
          vendor: dev.vendor,
          size: dev.size,
        };
      }),
    },
  } as StaticData;
}

export async function getDynamicData(): Promise<DynamicData> {
  const data = await get(template.dynamic);
  return {
    time: {
      current: data.time.current,
      uptime: data.time.uptime,
      timezone: data.time.timezone,
      timezoneName: data.time.timezoneName,
    },
    // users: "user, date, time, ip"
    users: data.users.map((user: any) => {
      return {
        username: user.user,
        login: {
          date: user.date,
          time: user.time,
        },
        ip: user.ip,
      } as User;
    }),
    // cpuCurrentSpeed: "min, avg, max, cores"
    // cpuTemperature: "main"
    // currentLoad: "currentLoad"
    cpu: {
      usage: data.currentLoad.currentLoad,
      temperature: data.cpuTemperature.main,
      speed: {
        average: data.cpuCurrentSpeed.avg,
        cores: data.cpuCurrentSpeed.cores,
      },
    },
    // mem: "active"
    mem: {
      active: data.mem.active,
    },
    // battery: "voltage, percent", // hasBattery is static
    battery: {
      percentage: data.battery.percent,
      voltage: data.battery.voltage,
    },
    // processes: "list",
    processes: {
      all: data.processes.all,
      running: data.processes.running,
      sleeping: data.processes.sleeping,
      blocked: data.processes.blocked,
      unknown: data.processes.unknown,
      list: data.processes.list.map((process: any) => {
        return {
          pid: process.pid,
          parent: process.parentPid,
          name: process.name,
          user: process.user,
          mem: process.mem,
          cpu: process.cpu,
          started: process.started,
          state: process.state,
        } as Process;
      }),
    },
    // disksIO: "rIO_sec, wIO_sec, ms", // dynamic
    disks: {
      read: data.disksIO.rIO_sec,
      write: data.disksIO.wIO_sec,
    },
    // networkInterfaces: "iface, ip4, ip4subnet, mac", // static
    network: {
      inerfaces: data.networkInterfaces.map((iface: NetworkInterface) => {
        return {
          iface: iface.iface,
          ip4: iface.ip4,
          ip4subnet: iface.ip4subnet,
          mac: iface.mac,
        } as NetworkInterface;
      }),
      // networkStats: "iface, operstate, rx_sec, tx_sec", // dynamic
      stats: data.networkStats.map((iface: any) => {
        return {
          iface: iface.iface,
          state: iface.state,
          recieved: iface.rx_sec,
          transferred: iface.tx_sec,
        } as NetworkStats;
      }),
    },
  } as DynamicData;
}
