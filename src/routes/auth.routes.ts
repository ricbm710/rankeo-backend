//express
import express from "express";
//controllers
import {
  getCurrentUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller";
//middleware
import {
  authenticate,
  blockIfAuthenticated,
} from "../middleware/auth.middleware";

const router = express.Router();

router.post("/login", blockIfAuthenticated, loginUser);
router.get("/me", authenticate, getCurrentUser);
router.post("/logout", logoutUser);

export default router;
