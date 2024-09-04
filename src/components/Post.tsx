import { IPostDocument } from "@/mongodb/models/post"

function Post({post}: {post: IPostDocument}) {
  return (
    <div>Post</div>
  )
}

export default Post