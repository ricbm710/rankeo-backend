//express
import express from "express";
//controllers
import { loginUser } from "../controllers/auth.controller";
//middleware
import { authenticate } from "../middleware/auth.middlware";

const router = express.Router();

router.post("/login", loginUser);

export default router;
