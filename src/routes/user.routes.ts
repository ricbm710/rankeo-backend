//express
import express from "express";
//controllers
import {
  checkEmailExists,
  getFullUserProfile,
  getUserPosts,
  registerUser,
} from "../controllers/user.controller";
import {
  authenticate,
  blockIfAuthenticated,
} from "../middleware/auth.middleware";

const router = express.Router();

router.post("/users", blockIfAuthenticated, registerUser);
router.get("/check-email", checkEmailExists);
router.get("/user", authenticate, getFullUserProfile);
router.get("/users/:userId/posts", getUserPosts);

export default router;
