const express = require('express');
const app = express();

app.use(express.json());

// ==========================
// In-memory log storage
// ==========================
let events = [];
let alerts = [];

// ==========================
// Detection rule threshold
// ==========================
const FAILED_LOGIN_THRESHOLD = 3;

// ==========================
// Receive security events
// ==========================
app.post('/event', (req, res) => {
    const event = {
        type: req.body.type,
        user: req.body.user,
        ip: req.ip,
        time: new Date().toISOString()
    };

    events.push(event);

    console.log("New event:", event);

    // ==========================
    // Simple SIEM rule
    // ==========================
    if (event.type === "failed_login") {
        const failedLogins = events.filter(e => e.type === "failed_login");

        if (failedLogins.length >= FAILED_LOGIN_THRESHOLD) {
            alerts.push({
                message: "Too many failed login attempts detected!",
                time: new Date().toISOString(),
                severity: "HIGH"
            });
        }
    }

    res.json({ status: "event received", event });
});

// ==========================
// View all events (API)
// ==========================
app.get('/events', (req, res) => {
    res.json(events);
});

// ==========================
// View alerts (API)
// ==========================
app.get('/alerts', (req, res) => {
    res.json(alerts);
});

// ==========================
// SIEM Dashboard (UI)
// ==========================
app.get('/', (req, res) => {
    res.send(`
        <h1>🛡️ Mini SIEM Dashboard</h1>

        <h2>Summary</h2>
        <p><b>Events:</b> ${events.length}</p>
        <p><b>Alerts:</b> ${alerts.length}</p>

        <hr/>

        <h2>📊 Recent Events</h2>
        <pre>${JSON.stringify(events, null, 2)}</pre>

        <h2>🚨 Alerts</h2>
        <pre>${JSON.stringify(alerts, null, 2)}</pre>

        <hr/>
        <p>Endpoints:</p>
        <ul>
            <li>POST /event</li>
            <li>GET /events</li>
            <li>GET /alerts</li>
        </ul>
    `);
});

// ==========================
// Start server
// ==========================
app.listen(3000, () => {
    console.log("🛡️ SIEM-lite running on port 3000");
});