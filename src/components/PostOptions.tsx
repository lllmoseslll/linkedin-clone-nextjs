"use client";

import { IPostDocument } from "@/mongodb/models/post";
import { SignedIn, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MessageCircle, Repeat2, Send, ThumbsUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { UnLikePostRequestBody } from "@/app/api/posts/[post_id]/unlike/route";
import { LikePostRequestBody } from "@/app/api/posts/[post_id]/like/route";
import CommentFeed from "./CommentFeed";
import CommentForm from "./CommentForm";
import { toast } from "sonner";

function PostOptions({ post }: { post: IPostDocument }) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  useEffect(() => {
    if (user?.id && post.likes?.includes(user.id)) {
      setLiked(true);
    }
  }, [post, user]);

  const likeOrUnlikePost = async () => {
    if (!user?.id) {
      throw new Error("user not authenticated");
    }

    const originalLiked = liked;
    const originalLikes = likes;

    const newLikes = liked
      ? likes?.filter((like) => like !== user.id)
      : [...(likes ?? []), user.id];

    const body: LikePostRequestBody | UnLikePostRequestBody = {
      userId: user.id,
    };

    setLiked(!liked);
    setLikes(newLikes);

    const response = await fetch(
      `/api/posts/${post._id}/${liked ? "unlike" : "like"}`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      setLiked(originalLiked);
      setLikes(originalLikes);
      toast.error("failed to like/unlike post")
      throw new Error("Failed to Like or Unlike post");
    }

    const fetchLikesResponse = await fetch(`/api/posts/${post._id}/like`);
    if (!fetchLikesResponse.ok) {
      setLiked(originalLiked);
      setLikes(originalLikes);

      throw new Error("Failed to fetch likes");
    }

    const newLikedData = await fetchLikesResponse.json();
    setLikes(newLikedData);
  };

  return (
    <div>
      <div className="flex justify-between p-5">
        <div>
          {likes && likes.length > 0 && (
            <p className="text-xs text-gray-500 cursor-pointer hover:underline">
              {likes.length} likes
            </p>
          )}
        </div>

        <div>
          {post?.comments && post.comments.length > 0 && (
            <p
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
              className="text-xs text-gray-500 cursor-pointer hover:underline"
            >
              {post.comments.length} comments
            </p>
          )}
        </div>
      </div>
      <div className="flex p-2 justify-between px-2 border-t">
        <Button
          variant={"ghost"}
          className="postButton"
          onClick={likeOrUnlikePost}
        >
          {/* if user has liked the post, show filled thumbs up icon */}
          <ThumbsUpIcon
            className={cn("mr-1", liked && "text-[#4881c2] fill-[#4881c2]")}
          />
          Like
        </Button>
        <Button variant={"ghost"} className="postButton">
          {/* if user has liked the post, show filled thumbs up icon */}
          <MessageCircle
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className={cn(
              "mr-1",
              isCommentsOpen && "text-gray-600 fill-gray-600"
            )}
          />
          Comment
        </Button>

        <Button variant={"ghost"} className="postButton">
          <Repeat2 className="mr-1" />
          Repost
        </Button>
        <Button variant={"ghost"} className="postButton">
          <Send className="mr-1" />
          Send
        </Button>
      </div>
      {isCommentsOpen && (
        <div className="p-4">
          <SignedIn>
            <CommentForm postId={String(post._id)} />
          </SignedIn>
          <CommentFeed post={post} />
        </div>
      )}
    </div>
  );
}

export default PostOptions;
