//express
import { Request, Response } from "express";
//services
import { PostService } from "../services/post.service";

const postService = new PostService();

export const getRankedPosts = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    const categoryId = req.query.categoryId
      ? Number(req.query.categoryId)
      : undefined;

    const sortBy = req.query.sortBy === "date" ? "date" : "relevance"; // default: relevance
    const sortOrder = req.query.order === "ASC" ? "ASC" : "DESC"; // default: DESC

    console.log(sortOrder);

    const posts = await postService.getPostsWithVotes(
      page,
      sortBy,
      sortOrder,
      userId,
      categoryId
    );
    res.json(posts);
  } catch (err) {
    console.error("No se pudo traer los rankings:", err);
    res
      .status(500)
      .json({ message: "Error -> No se pudo traer los rankings." });
  }
};
