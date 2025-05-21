//express
import express from "express";
//controllers
import { getCurrentUser, loginUser } from "../controllers/auth.controller";
//middleware
import {
  authenticate,
  blockIfAuthenticated,
} from "../middleware/auth.middlware";

const router = express.Router();

router.post("/login", blockIfAuthenticated, loginUser);
router.get("/me", authenticate, getCurrentUser);

export default router;
