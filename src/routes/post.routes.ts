//express
import express from "express";
//controllers
import { getRankedPosts } from "../controllers/post.controller";

const router = express.Router();

router.get("/posts", getRankedPosts);

export default router;
