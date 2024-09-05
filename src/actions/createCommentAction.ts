"use server";

import { currentUser } from "@clerk/nextjs/server";
import { IUser } from "../../types/user";
import { AddCommentRequestBody } from "@/app/api/posts/[post_id]/comments/route";
import { Post } from "@/mongodb/models/post";
import { IComment, ICommentBase } from "@/mongodb/models/comment";
import { revalidatePath } from "next/cache";

export default async function createCommentAction(
  postId: string,
  formData: FormData
) {
  const user = await currentUser();
  const commentInput = formData.get("commentInput" as string);

  if (!postId) throw new Error("post id not provided");
  if (!commentInput) throw new Error("comment input not provided");
  if (!user?.id) throw new Error("user not authenticated");

  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  const body: AddCommentRequestBody = {
    user: userDB,
    text: commentInput,
  };

  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  const comment: ICommentBase = {
    user: userDB,
    text: commentInput,
  };

  try {
    await post.commentOnPost(comment);
    revalidatePath("/");
  } catch (error) {
    throw new Error("an error while adding comment");
  }
}
