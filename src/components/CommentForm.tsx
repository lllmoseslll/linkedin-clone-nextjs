"use client";

import { useUser } from "@clerk/nextjs";
import { useRef } from "react";
import AvatorComponent from "./AvatorComponent";
import createCommentAction from "@/actions/createCommentAction";
import { toast } from "sonner";

function CommentForm({ postId }: { postId: string }) {
  const { user } = useUser();
  const ref = useRef<HTMLFormElement>(null);

  const createCommentActionWithPostId = createCommentAction.bind(null, postId);

  const handleCommentAction = async (formData: FormData): Promise<void> => {
    if (!user?.id) {
      throw new Error("user not authenticated");
    }

    const formDataCopy = formData;
    ref.current?.reset();

    try {
      await createCommentActionWithPostId(formDataCopy);
    } catch (error) {
      console.log("error creating comment ", error);
    }
  };

  return (
    <form
      ref={ref}
      action={(formData) => {
        const promise = handleCommentAction(formData);

        //toast
        toast.promise(promise, {
          loading: "creating comment",
          success: "comment created",
          error: "comment failed",
        });
      }}
      className="flex items-center space-x-1"
    >
      <AvatorComponent />

      <div className="flex flex-1 bg-white border rounded-lg px-3 py-2 ">
        <input
          type="text"
          name="commentInput"
          placeholder="Add a comment..."
          className="outline-none flex-1 text-sm bg-transparent"
        />
        <button type="submit" hidden>
          Comment
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
