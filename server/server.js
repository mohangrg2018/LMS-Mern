import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";

// Initialize dotenv
dotenv.config();

// Initialize Exress
const app = express();

//Connect DB
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

//Routes
app.get("/", (req, res) => {
  res.send("app is running");
});
app.post("/clerk", clerkWebhooks);
app.use("/api/educator", educatorRouter);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
