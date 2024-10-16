const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();
const path = require('path');

// Enable CORS for the frontend URL
app.use(cors({
  origin: FRONTEND_URL,  // Use the correct frontend URL from .env file
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow OPTIONS method
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'] // Ensure required headers are allowed
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.send("SERVER IS RUNNING");
});

app.get("/test", (req, res) => {
  return res.send("This is test route");
});

app.use("/api", router);

// Fix CORS issue with preflight requests by allowing OPTIONS method
app.options("*", cors()); // This will handle preflight requests

const PORT = process.env.PORT || 8087;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log(`Server is running on port ${PORT}`);
  });
});
