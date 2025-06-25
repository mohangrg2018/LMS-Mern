import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Initialize Exress
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize dotenv
dotenv.config();

//Routes
app.get("/", (req, res) => {
  res.send("app is running");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
