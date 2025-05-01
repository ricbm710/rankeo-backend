//express
import express from "express";
//controllers
import { loginUser } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", loginUser);

export default router;
