//express
import { Request, Response } from "express";
//services
import { PostService } from "../services/post.service";

const postService = new PostService();

export const getRankedPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await postService.getPostsWithVotes();
    res.json(posts);
  } catch (err) {
    console.error("No se pudo traer las publicaciones:", err);
    res
      .status(500)
      .json({ message: "Error -> No se pudo traer las publicaciones." });
  }
};
