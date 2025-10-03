# Project Plan

**Student Name**: [Your Name]
**Student Number**: [Your Student Number]

## Table of Contents

1. [Introduction](#introduction)
2. [Objective](#objective)
3. [Main Question](#main-question)
4. [MoSCoW Method](#moscow-method)
5. [SWOT Analysis](#swot-analysis)
6. [Stakeholders](#stakeholders)
7. [Planning](#planning)
8. [Learning Outcomes](#learning-outcomes)
9. [Conclusion](#conclusion)

## Introduction

The aim of the project is to create a real-time system monitoring dashboard for homelab environments. The system will collect performance metrics from multiple machines and display them in a centralized web interface, enabling remote monitoring and historical data analysis.

## Objective

The main objective is to create a lightweight, efficient, and user-friendly monitoring system in the span of 3 weeks.

The system will:

- **Monitor in real-time**: Display live CPU, memory, and disk metrics with sub-second updates
- **Support multiple machines**: Track metrics from 2-3+ machines simultaneously
- **Store historical data**: Enable analysis of past performance trends
- **Enable remote access**: Monitor homelab from anywhere via VPN
- **Minimize resource usage**: Lightweight agents with minimal system impact

## Main Question

How to efficiently monitor multiple machines in real-time with minimal overhead?

## MoSCoW Method

### Must Have
- Agent collecting system metrics (CPU, memory, disk)
- Local SQLite storage for historical data
- WebSocket server for real-time streaming
- Central registry for agent discovery
- Web dashboard displaying live metrics
- Basic charts visualization
- Agent auto-registration

### Should Have
- Connection status indicators
- Error handling and reconnection logic
- Historical data queries (last 24 hours)
- Multiple chart types
- Tailscale VPN setup

### Could Have
- Alert notifications
- Custom metric collection intervals
- Data export functionality
- Agent management UI

### Won't Have (for v1.0)
- Advanced authentication system
- Complex data aggregations
- Mobile app
- Multi-user support
- Cloud deployment

## SWOT Analysis

### Strengths
- Real-time monitoring
- Minimal dependencies
- Cross-platform compatibility
- Low resource footprint
- Simple deployment

### Weaknesses
- Limited to local network (without VPN)
- Single-user design
- Basic visualization

### Opportunities
- Add more metric types (network, temperature)
- Implement alerting system
- Create mobile dashboard
- Add data aggregation features

### Threats
- Network connectivity issues
- WebSocket connection instability
- SQLite file corruption
- Agent crashes

## Stakeholders

**Primary User**: Self (homelab administrator)

**Power/Interest Matrix:**
- High Power, High Interest: Self (developer and end user)
- Low Power, Low Interest: N/A (personal project)

## Planning

### Week 1: Agent Development & WebSocket (40 hours)

**Day 1-2: Agent Foundation (8h)**
- Set up Bun project structure - *1h*
- Implement metrics collection with systeminformation - *3h*
- Design and create SQLite schema - *2h*
- Basic metric storage logic - *2h*

**Day 3-4: WebSocket Implementation (8h)**
- Implement WebSocket server - *3h*
- Stream live metrics every 2-3 seconds - *2h*
- Test with browser console client - *2h*
- Error handling and connection lifecycle - *1h*

**Day 5: Historical Data API (4h)**
- REST endpoint for historical queries - *2h*
- Test with curl/Postman - *1h*
- Documentation - *1h*

**Weekend: Buffer & Experimentation (4h)**
- Refine implementation
- Test on local machine
- Fix bugs

---

### Week 2: Central Server & Multi-Machine (40 hours)

**Day 1-2: Central Registry (8h)**
- Set up central server project - *1h*
- Create registry SQLite schema - *1h*
- Implement registration endpoint - *3h*
- Agent list API endpoint - *2h*
- Test agent registration - *1h*

**Day 3-4: Multi-Machine Deployment (8h)**
- Deploy agent on 2-3 machines - *2h*
- Implement auto-registration on startup - *3h*
- Test cross-machine communication - *2h*
- Handle agent disconnections - *1h*

**Day 5: Tailscale Setup (4h)**
- Install Tailscale on all machines - *1h*
- Configure mesh network - *1h*
- Test remote access - *1h*
- Documentation - *1h*

**Weekend: Troubleshooting & Refinement (4h)**
- Fix connectivity issues
- Optimize registration flow
- Test reliability

---

### Week 3: Dashboard & Polish (40 hours)

**Day 1-2: Dashboard Foundation (8h)**
- Create HTML structure with Pico CSS - *2h*
- Implement agent list fetching - *2h*
- Display agents in UI - *2h*
- Basic styling and layout - *2h*

**Day 3-4: Real-Time Charts (8h)**
- Integrate Chart.js - *2h*
- Implement WebSocket connection to agent - *3h*
- Display live metrics in charts - *2h*
- Handle reconnections - *1h*

**Day 5: Polish & Features (4h)**
- Error handling and user feedback - *1h*
- Connection status indicators - *1h*
- Historical data view - *1h*
- Final UI polish - *1h*

**Weekend: Final Testing & Documentation (4h)**
- End-to-end testing
- Bug fixes
- Write documentation
- Create usage guide

---

### Total Time Estimate: 120 hours (3 weeks × 40h)

**Contingency**: Each week includes buffer time for unexpected issues and learning curve.

## Learning Outcomes

### Technical Skills
- **WebSocket Communication**: Understanding bidirectional real-time data streaming
- **Multi-Machine Architecture**: Service discovery, registration patterns, health checks
- **VPN Networking**: Tailscale mesh networking, secure remote access
- **Time-Series Data**: Efficient storage and querying of metrics
- **Real-Time Visualization**: Chart updates, performance optimization

### Professional Skills
- **System Design**: Designing distributed monitoring architecture
- **Documentation**: Writing clear technical documentation
- **Testing Strategy**: Incremental testing, debugging distributed systems
- **Time Management**: Delivering working product within 3-week timeline

### Homelab Knowledge
- Creating production-ready tools for personal infrastructure
- Understanding system metrics and monitoring patterns
- Network security and remote access best practices

## Conclusion

This project will result in a fully functional homelab monitoring system while developing valuable skills in real-time communication, distributed systems, and network security. The 3-week timeline is aggressive but achievable with focused development and the minimalist technology stack chosen. The system will serve as a foundational tool for ongoing homelab management and can be extended with additional features in the future.