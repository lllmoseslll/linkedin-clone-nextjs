import { IPostDocument } from "@/mongodb/models/post";
import Post from "./Post";

function PostFeed({ posts }: { posts: IPostDocument[] }) {
  return (
    <div className="space-y-2 pb-20">
      {posts.map((post) => ( 
        <Post key={String(post._id)} post={post} />
      ))}
    </div>
  );
}

export default PostFeed;
