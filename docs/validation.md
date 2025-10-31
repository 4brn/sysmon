# Verification & Validation

**Student Name:** Aleksandar Rangelov
**Student Number:** 572601

## Table of Contents

[TOC]

## 1. Test Environment

**Hardware:**

- Device: Framework 13 Laptop
- Processor: AMD Ryzen 5 7640
- Memory: 16GB RAM
- Storage: 1TB SSD
- Operating System: Linux

**Software:**

- Bun v1.1.34
- Firefox 131.0

## 2. Test Scope

**In Scope:**

- Data collection
- Data visualization 
- WebSocket connection
- UI functionality

**Out of Scope:**

- Multi-platform OS testing (only Linux tested)
- Load testing with 10+ concurrent clients
- Security penetration testing
- Performance benchmarking

## 3. Verification

### 3.1 Static Data Collection

> Verify `getStaticData()` returns correctly formatted data

**Steps:**

1. Execute `getStaticData()`
1. Observe console output of `getStaticData()`
1. Inspect data contents

**Expected Result:** Static data collected and displayed without errors

**Actual Result:** ✅ Pass

- System information collected successfully
- BIOS data retrieved correctly
- CPU specifications accurate
- Disk layouts populated
- Battery detection working

**Evidence:** Server console shows json object containing static data with no errors

---

### 3.2 Data Type Transformation

> Verify systeminformation data maps to the predefined TypeScript interfaces correctly

**Steps:**

1. Examine data transformation in `host/srs/data.ts`
1. Compare raw systeminformation output with transformed data
1. Verify type compliance

**Expected Result:** All data conforms to defined TypeScript interfaces

**Actual Result:** ✅ Pass

- Returned data structure matches according interface
- No type errors during compilation

---

### 3.3 Theme Toggle

> Verify theme switching functionality

**Steps:**

1. Open dashboard in browser
1. Click theme button
1. Verify data-theme attribute changes
1. Observe visual theme change

**Expected Result:** Theme switches between light and dark modes

**Actual Result:** ✅ Pass

- Button click changes data-theme attribute
- Visual theme updates
- No console errors

---

### 3.4 WebSocket Connection

> Verify client-server connection establishment

**Steps:**

1. Start host server
1. Start client server
1. Open browser to localhost:1337
1. Click connect button
1. Observe host server logs

**Expected Result:** WebSocket connection established, connection logged on host server

**Actual Result:** ✅ Pass

- Connection opened successfully
- Host server logs show client connection
- Client subscribed to "stream" channel
- Static data sent immediately

---

### 3.5 Multi-Client Handling

> Verify server handles multiple clients connected to 1 host device

**Steps:**

1. Start host server
1. Start client server
1. Open dashboard in two browser tabs
1. Observe server logs for connections
1. Close one tab
1. Verify client counter decrements

**Expected Result:** Both clients receive data independently, counter tracks correctly

**Actual Result:** ✅ Pass

- Client counter increased to 2
- Both tabs received static data
- Closing tab decremented counter to 1
- No interference between clients

---

### 3.6 Server Graceful Shutdown

> Verify clean server termination

**Steps:**

1. Start host server
1. Establish connection with host server
1. Send SIGINT signal to host server (Ctrl+C)
1. Observe shutdown sequence

**Expected Result:** Scraping Interval cleared, connections closed, clean exit

**Actual Result:** ✅ Pass

- Scrape interval stopped
- WebSocket connections closed
- "Server killed gracefully" message displayed
- No resource leaks or hanging processes

---

### 3.7 Display All Information

> Verify that all information is displayed and UI works accordingly

**Steps:**

1. Start host server
1. Start client server
1. Open dashboard on localhost:1337
1. Click connect button
1. Expand all accordion elements
1. Verify all information is displayed accordingly

**Expected Result:** Time, system, cpu, memory, disk, netowork, battery, users and processes information displayed

**Actual Result:** ✅ Pass

---

## 4. Validation 

### 4.1 Collect Metrics Information

**Status:** ✅ Validated

**Evidence:**

- All specified static metrics collected (time, system, cpu, memory, disk, netowork, battery, users and processes)
- Data accuracy verified against system utilities
- Type safety enforced through TypeScript interfaces

---

### 4.2 Real-Time Communication

**Status:** ✅ Validated

**Evidence:**

- WebSocket connection established successfully
- Static data transmitted immediately
- Dynamic data transmitted on defined intervals

---

### 4.3 Multi-Client Support

**Status:** ✅ Validated

**Evidence:**

- Multiple browser tabs connect independently
- Pub-sub pattern broadcasts efficiently
- Client counter tracks connections accurately
- No interference between clients

---

### 4.4 Cross-Platform & Browser Support

**Status:** ⚠️ Limited Validation

**Evidence:**

- Tested on Linux - ✅ Working
- Tested on Firefox 131 - ✅ Working
- Not tested on: Chrome, Safari, Edge
- Not tested on: Windows, MacOS

WebSocket and DOM APIs are standard, so compatability is likely

---

### 4.5 Responsive Interface

**Status:** ✅ Validated

**Evidence:**

- Accordion design works for all screen sizes
- Monospace font renders consistently
- Theme toggle functional

---

### 4.6 Zero-Configuration Client Access

**Status:** ✅ Validated

Users can access monitoring dashboard from any browser without installing software.

---

### 4.7 Information Visibility

**Status:** ✅ Validated

Any information accessible within 2 clicks.

------

### 4.8 Visual Clarity

**Status:** ✅ Validated

Information presented in organized sections with clear labels. Both light and dark themes provide adequate contrast.

## 5. Summary

**Verification**

The codebase implements the technical design correctly. Data collection, WebSocket communication, and frontend rendering function as specified. Type safety enforced through TypeScript prevents data violations.

**Validation**

The project meets user requirements. System monitoring works correctly, providing accurate hardware information. However, Cross platform operating systems and browser support was not entirely validated. Multi-client support and connection reliability validated successfully.
