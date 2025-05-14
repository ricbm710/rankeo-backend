//data-source
import { AppDataSource } from "../data-source";
//entities
import { Posts } from "../entities/Posts";

export class PostService {
  private postRepo = AppDataSource.getRepository(Posts);

  async getPostsWithVotes() {
    const posts = await this.postRepo.find({
      relations: {
        creator: true,
        category: true,
        votes: true,
      },
    });

    // Map and compute scores
    const formattedPosts = posts.map((post) => {
      const upvotes = post.votes.filter((v) => v.is_upvote).length;
      const downvotes = post.votes.filter((v) => !v.is_upvote).length;
      const score = upvotes - downvotes;

      return {
        id: post.id,
        question: post.question,
        image_url: post.image_url,
        created_at: post.created_at,
        creator: {
          id: post.creator.id,
          name: post.creator.name,
          image_string: post.creator.image_string,
        },
        category: {
          id: post.category.id,
          name: post.category.category_name,
        },
        upvotes,
        downvotes,
        score,
      };
    });

    // Sort by score descending
    formattedPosts.sort((a, b) => b.score - a.score);

    return formattedPosts;
  }
}
