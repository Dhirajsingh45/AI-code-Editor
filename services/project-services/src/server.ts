import express from "express";
import cors from "cors";

const app = express();

const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({
    success: true,
    service: "project-service",
    message: "Project service is running",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Project service running on port ${PORT}`);
});