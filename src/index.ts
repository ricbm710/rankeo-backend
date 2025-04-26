import express, { Request, Response } from "express";
import cors from "cors";
// import dotenv from "dotenv";
import "reflect-metadata";
//data-source
import { AppDataSource } from "./data-source";
//routes
import userRouter from "./routes/user.routes";

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", userRouter);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World!");
// });

// app.get("*", (req: Request, res: Response) => {
//   res.status(505).json({ message: "Bad Request" });
// });

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
