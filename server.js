import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/connectDB.config.js";
import mainRouter from "./routes/index.js";

// Load environment variables
dotenv.config({ path: ".env" });
const app = express();
// Logger
app.use(morgan("dev"));
// Connect to database
connectDB();
// Middleware
app.use(express.json());

// Routes

app.use("/api/v1", mainRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
