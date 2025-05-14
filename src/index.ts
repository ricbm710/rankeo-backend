//express
import express from "express";
//cors
import cors from "cors";
//dotenv
import dotenv from "dotenv";
//reflect-metadata
import "reflect-metadata";
//data-source
import { AppDataSource } from "./data-source";
//routes
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import postRouter from "./routes/post.routes";
//cookie-parser
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // adjust to your frontend's URL
    credentials: true, // 👈 allow cookies to be sent
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", postRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("PostgreSQL connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
