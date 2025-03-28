import { connectDB } from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  await connectDB();

  try {
    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ error: "post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "an error occurred while fetching post" },
      { status: 500 }
    );
  }
}

export interface DeletePostRequestbody {
  userId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  auth().protect();
  await connectDB();

  const { userId }: DeletePostRequestbody = await request.json();

  try {
    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found " }, { status: 404 });
    }

    if (post.user.userId !== userId) {
      throw new Error("post doesnt not belong to the user");
    }
    await post.removePost();

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "an error occurred while deleting post" },
      { status: 500 }
    );
  }
}
