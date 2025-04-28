//express
import express from "express";
//controllers
import { registerUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/users", registerUser);

export default router;
