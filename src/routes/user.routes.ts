//express
import express from "express";
//controllers
import { checkEmailExists, registerUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/users", registerUser);
router.get("/check-email", checkEmailExists);

export default router;
