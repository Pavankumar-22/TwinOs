const express = require("express");
const cors = require("cors");
const path = require("path");

// Route loader (simple)
const statsRoute = require("./routes/statsRoute");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).send("TwinOS Backend is running!");
});

// API routes
app.use("/api/stats", statsRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
