import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/notes", noteRoutes);

// Start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
});
