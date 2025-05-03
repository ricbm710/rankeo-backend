//express
import express from "express";
//controllers
import { getCurrentUser, loginUser } from "../controllers/auth.controller";
//middleware
import { authenticate } from "../middleware/auth.middlware";

const router = express.Router();

router.post("/login", loginUser);
router.get("/me", authenticate, getCurrentUser);

export default router;
