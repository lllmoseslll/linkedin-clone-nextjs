import { connectDB } from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export interface UnLikePostRequestBody {
  userId: string;
}

export async function POST(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  auth().protect();

  await connectDB();

  const { userId }: UnLikePostRequestBody = await request.json();

  try {
    const post = await Post.findById(params.post_id);
    if (!post) {
      return NextResponse.json({ error: "post not found" }, { status: 404 });
    }
    await post.unlikePost(userId);

    return NextResponse.json({ message: "post successfully liked" });
  } catch (error) {
    return NextResponse.json(
      { error: "an error occurred while liking the post" },
      { status: 500 }
    );
  }
}
