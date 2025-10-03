# 🛠 SysMon: System Monitoring

Goal: Real-time dashboard showing system metrics (e.g. memory usage).

Metrics: Collected via systeminformation every 10 seconds.

Storage: Saved to local SQLite DB.

Backend: Uses Bun for:

API routes (/api/history) to serve historical data.

WebSocket (/ws) to push live updates to the frontend.

Frontend: Displays charts (e.g., with Chart.js), receives real-time updates via WebSocket.

Data Window: Shows last 4 hours of metrics.

Tech Stack:
[systeminformation](https://systeminformation.io/)
[PicoCss](https://picocss.com/)
[Chart.js](https://www.chartjs.org/)
[Bun](https://bun.sh/)
