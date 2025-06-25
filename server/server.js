import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

// Initialize dotenv
dotenv.config();

// Initialize Exress
const app = express();

//Connect DB
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("app is running");
});

app.post("/clerk", express.json(), clerkWebhooks);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
