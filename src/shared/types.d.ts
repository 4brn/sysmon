export interface SysmonResponse {
  type: "static" | "dynamic";
  data: StaticData | DynamicData;
}

export interface DiskLayout {
  device: string;
  deviceType: string;
  name: string;
  vendor: string;
  size: number;
}

export interface StaticData {
  system: {
    model: string;
    vendor: string;
    virtual: boolean;
  };
  bios: {
    vendor: string;
    version: string;
    release: string;
  };
  os: {
    platform: string;
    distro: string;
    kernel: string;
    arch: string;
    hostname: string;
  };
  cpu: {
    vendor: string;
    model: string;
    cores: number;
    threads: number;
  };
  mem: {
    total: number;
  };
  battery: {
    hasBattery: boolean;
  };
  disks: {
    layouts: DiskLayout[];
  };
}

export interface User {
  username: string;
  login: {
    date: string;
    time: string;
  };
  ip: string;
}

export interface Process {
  pid: number;
  parent: number;
  name: string;
  cpu: number;
  mem: number;
  priority: number;
  nice: number;
  started: {
    date: string;
    time: string;
  };
  state: string;
  user: string;
}

export interface NetworkInterface {
  iface: string;
  ip4: string;
  ip4subnet: string;
  mac: string;
}

export interface NetworkStats {
  iface: string;
  state: string;
  recieved: number | null;
  transferred: number | null;
}

export interface DynamicData {
  time: {
    current: number;
    uptime: number;
    timezone: string;
    timezoneName: string;
  };
  users: User[];
  cpu: {
    speed: {
      average: number;
      cores: number[];
    };
    temperature: number;
    usage: number;
  };
  mem: {
    active: number;
  };
  battery: {
    voltage: number;
    percentage: number;
  };
  processes: {
    all: number;
    running: number;
    sleeping: number;
    blocked: number;
    unknown: number;
    list: Process[];
  };
  disks: {
    read: number | null;
    write: number | null;
  };
  network: {
    interfaces: NetworkInterface[];
    stats: NetworkStats[];
  };
}
