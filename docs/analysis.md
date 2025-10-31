## Analysis

**Name:** Aleksandar Rangelov
**Student Number:** 572601

### Table of Contents

[TOC]

### 1. Project Description

Sysmon is a real-time system monitoring platform that displays hardware, software and performance metrics of a device. Users can view CPU usage, memory consumption, disk activity, network statistics, and running processes through a web-based dashboard accessible from any device on the local network.

**Key Features:**

- Display static hardware information (CPU model, memory capacity, disk layouts)
- Monitor dynamic metrics (CPU usage, temperature, active processes, network traffic)
- Support multiple concurrent viewers
- Responsive web interface with theme customization

### 2. Requirements

#### 2.1 Functional Requirements

1. Collect system information from the host machine
1. Send real-time data to connected clients
1. Display metrics (CPU, memory, battery, etc.)
1. List active processes with resource allocation
1. Monitor network interface statistics
1. Support theme switching (light/dark mode)
1. Handle multiple simultaneous client connections

#### 2.2 Non-Functional Requirements

- **Performance:** Update frequency between 10-30 seconds for monitoring without excessive overhead
- **Accessibility:** Zero-configuration access from any browser on the network
- **Scalability:** Support multiple concurrent viewers without performance degradation
- **Usability:** Easily accessible information, minimal learning curve

#### 2.3 User Stories

- As a developer, I want to monitor my system resources while coding, so I can identify performance bottlenecks.
- As a system administrator, I want to monitor all machines from one dashboard, so I can manage infrastructure efficiently.
- As a user, I want automatic updates without page refresh, so I can see changes in real-time.
- As a mobile user, I want to check system status from my phone, so I can monitor remotely.

### 3. Technical Stack

#### 3.1 Host

> Host acts as a backend. Consists of  a scraping agent, responsible for gathering metrics and a web server for communication with clients.

##### 3.1.1 Bun[^1]

> Bun is a modern JavaScript runtime, written in Zig. It aims to replace outdated runtimes like node and values speed and developer experience.

- Built-in WebSocket support
- Significantly faster I/O operations than Node.js
- Native TypeScript support
- Lightweight with minimal dependencies

##### 3.1.2 systeminformation[^2]

> systeminformation is a library for retrieving detailed hardware, system and OS information.

- Cross-platform: MacOS, Windows, Linux, Android, etc.
- Actively maintained with regular updates
- Zero dependencies
- 100% JavaScript

After an indepth research of the library I found out that the returned metrics are not structured with readability in mind. Moreover there is a lot of irrelevant information included. It would be advisory to create a custom return object, containing only relevant information, structured in a semantic and readable way. Luckly, systeminformation allows for filtering metrics data.

##### 3.1.3 WebSocket Protocol [^3]

> The WebSocket Protocol uses HTTP to create a TCP connection between devices.

- Real-time bidirectional communication
- Lower overhead than HTTP polling
- Native browser support
- Efficient for streaming continuous data updates

#### 3.2 Frontend

##### 3.2.1 JavaScript

- Direct DOM manipulation for maximum performance
- No build/compilation required 
- Easy to understand and maintain

##### 3.2.2 Pico CSS [^4]

- Lightweight CSS framework (< 10KB)
- Semantic HTML styling
- Built-in dark mode support
- Responsive design without custom media queries

### 4. Advice

#### 4.1 Configuration

Use environment variables for deployment flexibility:

- WebSocket URL configuration
- Update interval timing
- Port numbers for both servers
- Production/development mode switching

#### 4.2 Optimization

- Implement data caching for expensive operations
- Lazy load non-critical information in collapsed sections

### 5. Conclusion

Sysmon's architecture prioritizes simplicity and performance through careful technology selection. The combination of Bun's speed, WebSocket's efficiency, and minimal frontend dependencies creates a lightweight monitoring solution suitable for personal and professional use. The modular design allows for future enhancements without architectural changes.

[^1]: Bun documentation. (n.d.). Retrieved October 6th, 2025, from [bun.sh](https://bun.sh)
[^2]: systeminformation documentation. (n.d.). Retrieved October 6, 2025, from  [systeminformation.io](https://systeminformation.io/)

[^3]: Websocket specification. (n.d.) Retrieved Octoboer 6, 2025, from [websockets.spec.whatwg.org](https://websockets.spec.whatwg.org/)
[^4]: Pico CSS website. (n.d.) Retrieved October 6, 2025, from [picocss.com](https://picocss.com/)
