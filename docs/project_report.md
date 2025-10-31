# Sysmon - Project Report

**Student Name:** Aleksandar Rangelov
 **Student Number:** 572601

## Table of Contents

[TOC]

## 1. Summary

Sysmon is a real-time system monitoring web application that collects hardware and performance metrics from host devices and displays them through a web dashboard. The project uses WebSocket for real-time communication between a host server and web clients.

**Delivered Features:**

- WebSocket server collecting system metrics
- System metrics data display
- Multi-client support with pub-sub pattern
- Responsive web interface with theme toggle
- Automatic reconnection handling
- Cross-platform compatibility

## 2. Features

### 2.1 Host Server

**Completed:**

- Project setup
- TypeScript configuration with shared types
- WebSocket server
- Static data collection (system, BIOS, OS, CPU, memory, disks)
- Dynamic data collection (CPU usage, temperature, processes, network, disk I/O)
- Pub-sub broadcasting to multiple clients
- Client connection tracking
- Graceful shutdown handling
- Data buffering for fast initial response

**Incomplete:**

- Host IP registry for multiple devices
- Host auto-registration

### 2.2 Client

**Completed:**

- Project setup
- WebSocket client connection
- Semantic HTML structure
- Static data rendering
- Dynamic data rendering
- Theme toggle (light/dark mode)
- Connection status indicators
- Loading state indicators
- Responsive layout

**Incomplete:**

- Theme persistence across page reloads
- Loading state bug fix on reconnection
- Data visualization charts

## 3. Time Management

### 3.1 Analysis

| Task                        | Estimated | Actual |
| --------------------------- | --------- | ------ |
| Requirements collection     | -         | 2 h     |
| Research tools & frameworks | 2 h        | 5 h   |
| Documentation               | 4 h        | 4 h    |
| **Total**                   | **6 h**    | **11 h** |

> Underestimated analysis phase. Needed extra time to understand Bun and WebSocket approaches. Requirements gathering not initially planned  for but necessary for clarity.

### 3.2 Design

| Task                  | Estimated | Actual   |
| --------------------- | --------- | -------- |
| Code structure design | 1 h       | 1 h      |
| Agent logic design    | 5 h       | 5 h      |
| Client logic design   | 3 h       | 2 h      |
| Wireframe creation    | 2 h       | 2 h      |
| **Total**             | **11 h**  | **10 h** |

> Overestimated design complexity. Original plan included multiple host device registry and  monitoring, but scope was reduced early. This saved some design time.

### 3.3 Realisation

#### 3.3.1 Host

| Task                   | Estimated | Actual   |
| ---------------------- | --------- | -------- |
| Project setup          | 2 h       | 2 h      |
| Metrics collection     | 6 h       | 5 h      |
| WebSocket server       | 5 h       | 4 h      |
| Live metrics streaming | 2 h       | 2 h      |
| Testing with Postman   | 4 h       | 2 h      |
| **Total**              | **19 h**  | **15 h** |

> Overestimated host server complexity. Bun's built-in features (WebSocket, HTTP server) eliminated configuration overhead. In addition, Systeminformation library provided everything needed without custom implementation, apart from custom semantic data type with only relevant information for this project.

#### 3.3.2 Client

| Task                  | Estimated | Actual   |
| --------------------- | --------- | -------- |
| Project setup         | 1 h       | 1 h      |
| Web server setup      | 2 h       | 1 h      |
| WebSocket connection  | 3 h       | 3 h      |
| HTML structure        | 3 h       | 3 h      |
| Display live metrics  | 3 h       | 4 h      |
| Reconnection handling | 1 h       | 1 h      |
| Connection indicators | 1 h       | 1 h      |
| Styling and layout    | 2 h       | 1 h      |
| Final polish          | 1 h       | 1 h      |
| **Total**             | **17 h**  | **16 h** |

> Nearly accurate estimate overall. underestimated dynamic data rendering.

### 3.4 Verification & Validation

| Task      | Estimated | Actual  |
| --------- | --------- | ------- |
| Testing   | 4 h       | 4 h     |
| **Total** | **4 h**   | **4 h** |

### 3.5 Documentation

| Task                      | Estimated | Actual   |
| ------------------------- | --------- | -------- |
| Realisation               | 5 h       | 6 h      |
| Design                    | 4 h       | 4 h      |
| Analysis                  | 4 h       | 4 h      |
| Verification & Validation | 4 h       | 4 h      |
| Project report            | 2 h       | 2 h      |
| **Total**                 | **19 h**  | **20 h** |

> Slightly underestimated documentation time. Initial documents required revisions. Learning proper documentation structure took iterations.

## 4. Resources

### 4.1 Technology Stack

**Host:**

- Bun v1.1.34
- TypeScript 5.0+
- systeminformation 5.27.11

**Client:**

- JavaScript
- Pico CSS
- JetBrains Mono font

**Development:**

- Git
- Zed/Neovim
- Firefox Developer Tools

### 4.2 Hardware

**Development Machine:**

- Framework 13 Laptop
- CPU: AMD Ryzen 5 7640U
- Memory: 16GB
- Storage: 1TB NVMe SSD
- Operating System: Linux (Arch)

------

## 5. Conclusion

The project delivered a functional monitoring system within the planned 4 week deadline. Technology choices proved excellent, particularly Bun's integrated features and the systeminformation library.

Clean architecture with type-safe communication protocol.
