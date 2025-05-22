//express
import express from "express";
//controllers
import { checkEmailExists, registerUser } from "../controllers/user.controller";
import { blockIfAuthenticated } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/users", blockIfAuthenticated, registerUser);
router.get("/check-email", checkEmailExists);

export default router;
