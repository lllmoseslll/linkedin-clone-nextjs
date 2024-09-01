"use client";

import { Divide, ImageIcon, XIcon } from "lucide-react";
import AvatorComponent from "./AvatorComponent";
import { Button } from "./ui/button";
import { useRef, useState } from "react";

function PostForm() {
  const ref = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const handlePostAction = async (formData: FormData) => {
    const formDataCopy = formData;
    ref.current?.reset();

    const text = formDataCopy.get("postInput") as string;
    if (!text.trim()) {
      throw new Error("Post input is required");
    }
    setPreview(null);
    try {
      await createPostAction(formDataCopy);
    } catch (error) {
      console.log("error creating the post", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mb-2 ">
      <form
        ref={ref}
        action={(formData) => {
          // handle form submittion
          handlePostAction(formData);
          // toast notificaitons
        }}
        className="p-3"
      >
        <div className="flex items-center space-x-2">
          <AvatorComponent />
          <input
            type="text"
            name="postInput"
            placeholder="Write your mind..."
            className="flex-1 outline-none rounded-md py-3 px-4 border"
          />

          <input
            ref={fileInputRef}
            onChange={handleImageChange}
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
          />
          <button type="submit" className="hidden">
            Post
          </button>
        </div>
        {/* preview conditional check  */}
        {preview && (
          <div>
            <img src={preview} alt="Preview" className="w-full object-cover" />
          </div>
        )}

        <div className="flex justify-end mt-2 space-x-2">
          <Button type="button" onClick={() => fileInputRef.current?.click()}>
            <ImageIcon className="mr-2" size={16} color="currentColor" />
            {preview ? "Change" : "Add"} Image
          </Button>
          {/* add a remove preview button */}
          {preview && (
            <Button type="button" onClick={() => setPreview(null)}>
              <XIcon className="mr-2 " size={16} color="currentColor" />
              Remove image
            </Button>
          )}
        </div>
      </form>
      <hr className="mt-2 border-gray-300" />
    </div>
  );
}

export default PostForm;
