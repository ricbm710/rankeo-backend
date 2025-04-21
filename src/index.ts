import express from "express";
import cors from "cors";
//db config
import { pool } from "./db";

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors()); //required when frontend & backend ports are different
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Welcome to Rankeo Bolivia.");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//connection test
pool
  .connect()
  .then(() => console.log(`✅ Connected to PostgreSQL`))
  .catch((err) => console.error("❌ Database connection error:", err));
