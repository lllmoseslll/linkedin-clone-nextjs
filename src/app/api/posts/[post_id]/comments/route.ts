import { connectDB } from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { NextResponse } from "next/server";
import { IComment, ICommentBase } from "@/mongodb/models/comment";
import { IUser } from "../../../../../../types/user";

export async function GET(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  try {
    await connectDB();

    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ error: "No post found" }, { status: 404 });
    }

    const comments = await post.getAllComments();
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json(
      { error: "error fetching comments" },
      { status: 500 }
    );
  }
}

export interface AddCommentRequestBody {
  user: IUser;
  text: string;
}

export async function POST(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  await connectDB();
  const { user, text }: AddCommentRequestBody = await request.json();

  try {
    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ error: "No post found" }, { status: 404 });
    }

    const comment: ICommentBase = {
      user,
      text,
    };

    await post.commentOnPost(comment);
    return NextResponse.json({ message: "Comment added successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "error adding comment" },
      { status: 500 }
    );
  }
}
