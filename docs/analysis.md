# Analysis - Monitoring System

**Name**: Aleksandar Rangelov
**Student Number**: [Your Student Number]

## Table of Contents

1. [Introduction](#introduction)
2. [Main Question](#main-question)
3. [Technology Comparison](#technology-comparison)
   - [Runtime Environments](#runtime-environments)
   - [Web Frameworks](#web-frameworks)
   - [Database Solutions](#database-solutions)
   - [Frontend Approaches](#frontend-approaches)
   - [VPN Solutions](#vpn-solutions)
4. [Conclusion](#conclusion)

## Introduction

This document analyzes various solutions for the development of the project. The goal is to minimize dependencies, while still creating a lightweight and efficient tech stack that provides ease of use, speed and maintainability.

## Main Question

How to create a lightweight, real-time monitoring system with minimal dependencies?

## Technology Stack

### Runtime Environments

> Software platform that provides an environment for executing code.

#### Bun [^1]

Modern JavaScript runtime with built-in WebSocket, SQLite, and HTTP server support.

| Feature | Specification |
|---------|--------------|
| Performance | 4x faster than Node.js |
| Built-in APIs | HTTP, WebSocket, SQLite, bundler |

**Advantages:**
- Native WebSocket and SQLite (no external libraries)
- Extremely fast startup and execution
- Single binary distribution
- TypeScript support built-in

**Disadvantages:**
- Newer ecosystem (less mature)
- Occasional compatibility issues

#### Node.js [^2]

**Advantages:**
- Mature and battle-tested
- Extensive package ecosystem

**Disadvantages:**
- Requires external packages for WebSocket and SQLite
- Slower performance
- More complex setup

#### Deno [^3]

**Disadvantages:**
- Different module system (URLs vs npm)
- Smaller ecosystem
- Less streamlined WebSocket/SQLite support

### Web Frameworks

#### No Framework (Native APIs)

Using runtime's built-in HTTP server without additional frameworks.

**Advantages:**
- Zero dependencies
- Maximum performance
- Direct control
- Perfect for simple APIs (2-3 endpoints)

**Disadvantages:**
- Manual routing
- No built-in middleware

#### Hono [^4]

Lightweight web framework (~20KB).

**Advantages:**
- Clean routing API
- Middleware support
- Cross-runtime compatible

**Disadvantages:**
- Additional dependency
- Unnecessary for simple projects

#### Express.js [^5]

**Disadvantages:**
- Heavier than needed
- Older design patterns
- Less optimal on Bun

### Database Solutions

#### SQLite (Native) [^6]

Serverless, embedded SQL database.

**Advantages:**
- Zero configuration
- Perfect for local storage
- Excellent for time-series data
- File-based (easy backups)
- Fast synchronous API

**Disadvantages:**
- Not for concurrent writes (not relevant here)

#### Drizzle ORM [^7]

TypeScript ORM with type-safe queries.

**Advantages:**
- Type safety
- Migration management

**Disadvantages:**
- Additional dependency
- Performance overhead
- Unnecessary for simple INSERT/SELECT

#### PostgreSQL/MySQL

**Disadvantages:**
- Requires separate server
- Overkill for local storage
- Additional maintenance
- Network latency

### Frontend Approaches

#### Vanilla JavaScript + Pico CSS

Plain JavaScript with Pico CSS framework.

**Advantages:**
- No build step
- Instant reload
- Simple mental model
- Beautiful styling with minimal markup
- CDN delivery

**Disadvantages:**
- Manual DOM updates (acceptable for simple UI)

#### React [^8]

**Disadvantages:**
- Requires build tooling
- Additional complexity
- Overkill for simple dashboard
- Slower development iteration

#### Chart.js [^9]

Simple charting library.

**Advantages:**
- Simple API
- Good real-time performance
- CDN availability
- Sufficient for metrics visualization

### VPN Solutions

#### Tailscale [^10]

Zero-config VPN based on WireGuard.

**Advantages:**
- Zero configuration
- No port forwarding required
- Magic DNS
- Free for personal use
- 5-minute setup
- Works across NAT/firewalls

**Disadvantages:**
- Requires trust in Tailscale infrastructure

#### WireGuard [^11]

**Disadvantages:**
- Manual configuration
- Complex multi-device setup

#### OpenVPN [^12]

**Disadvantages:**
- Complex configuration
- Slower than WireGuard
- Certificate management

## Conclusion

**Selected Stack:**

| Component | Technology | Reason |
|-----------|-----------|--------|
| Runtime | Bun | Native WebSocket, SQLite, HTTP; superior performance |
| Framework | None | Simple routing needs don't justify overhead |
| Database | SQLite (native) | Perfect for local time-series storage |
| ORM | None | Raw SQL is sufficient and faster |
| Frontend | Vanilla JS | No build step, direct control |
| Styling | Pico CSS (CDN) | Beautiful with minimal markup |
| Charts | Chart.js (CDN) | Simple API, good performance |
| VPN | Tailscale | Zero-config, perfect for homelab |

**Total Dependencies:** 1 npm package (systeminformation)

This minimal stack maximizes learning value (focus on WebSockets and networking rather than framework abstractions) while delivering a lightweight, production-ready homelab tool within the 3-week timeline. The absence of build steps, complex tooling, and unnecessary abstractions aligns perfectly with the project's simplicity requirements.

---

[^1]: Bun - https://bun.sh/
[^2]: Node.js - https://nodejs.org/
[^3]: Deno - https://deno.land/
[^4]: Hono - https://hono.dev/
[^5]: Express.js - https://expressjs.com/
[^6]: SQLite - https://www.sqlite.org/
[^7]: Drizzle ORM - https://orm.drizzle.team/
[^8]: React - https://react.dev/
[^9]: Chart.js - https://www.chartjs.org/
[^10]: Tailscale - https://tailscale.com/
[^11]: WireGuard - https://www.wireguard.com/
[^12]: OpenVPN - https://openvpn.net/
