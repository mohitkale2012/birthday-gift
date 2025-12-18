const express = require("express");
const cors = require("cors");

const memoriesRouter = require("./routes/memories");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check / sanity route
app.get("/", (req, res) => {
  res.json({ message: "Birthday App API is running!" });
});

// Routes
app.use("/api/memories", memoriesRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);

  const status = err.statusCode || 500;
  const message = status === 500 ? "Internal Server Error" : err.message;

  res.status(status).json({ error: message });
});

module.exports = app;


