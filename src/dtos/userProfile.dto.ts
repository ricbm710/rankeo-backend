//entities
import { Users } from "../entities/Users";

export interface UserProfileDTO {
  id: number;
  name: string;
  email: string | null;
  auth_provider: string;
  member_since: Date;
  image_string: string | null;
  posts: any[]; // You can make this stricter if you want
}

export const toUserProfileDTO = (user: Users): UserProfileDTO => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    auth_provider: user.auth_provider,
    member_since: user.member_since,
    image_string: user.image_string,
    posts: user.posts,
  };
};
