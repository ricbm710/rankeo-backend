//data-source
import { AppDataSource } from "../data-source";
//entities
import { Posts } from "../entities/Posts";

export class PostService {
  private postRepo = AppDataSource.getRepository(Posts);

  async getPostsWithVotes(
    page: number = 1,
    sortBy: "relevance" | "date" = "relevance",
    sortOrder: "asc" | "desc" = "desc",
    userId?: number,
    categoryId?: number
  ) {
    const limit = 8;
    const offset = (page - 1) * limit;

    // Build dynamic where clause
    const whereClause: any = {};
    if (userId) whereClause.creator = { id: userId };
    if (categoryId) whereClause.category = { id: categoryId };

    const posts = await this.postRepo.find({
      where: whereClause,
      relations: {
        creator: true,
        category: true,
        votes: true,
        postOptions: {
          votes: true,
        },
      },
      order: sortBy === "date" ? { created_at: sortOrder } : {}, // relevance is manually sorted
      skip: offset,
      take: limit,
    });

    const formattedPosts = posts.map((post) => {
      const upvotes = post.votes.filter((v) => v.is_upvote).length;
      const downvotes = post.votes.filter((v) => !v.is_upvote).length;
      const optionCount = post.postOptions.length;
      const optionCountWeight = optionCount * 1.5;

      const score = upvotes - downvotes + optionCountWeight;

      const optionVotesCount = post.postOptions.reduce((sum, option) => {
        return sum + option.votes.length;
      }, 0);

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
        optionCount,
        optionVotesCount,
      };
    });

    // Manual sort by score if "relevance" is selected
    if (sortBy === "relevance") {
      formattedPosts.sort((a, b) =>
        sortOrder === "asc" ? a.score - b.score : b.score - a.score
      );
    }

    return formattedPosts;
  }
}
