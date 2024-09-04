"use server";

import { currentUser } from "@clerk/nextjs/server";
import { IUser } from "../../types/user";
import { Post } from "@/mongodb/models/post";
import { AddPostRequestBody } from "@/app/api/posts/route";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { revalidatePath } from "next/cache";

export default async function createPostAction(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not authenticated");
  }
  const postInput = formData.get("postInput") as string;
  const image = formData.get("image") as File;
  let imageUrl: string | undefined;

  if (!postInput) {
    throw new Error("No post input provided");
  }

  // define user
  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  try {
    if (image.size > 0) {
      // upload the image if there is one - either firestore or cloudinary
      console.log(image);

      const storageRef = ref(storage, `images/${image.name}`);

      // Upload the file
      const snapshot = await uploadBytes(storageRef, image);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log(downloadURL);

      // create post in database with the image
      const body: AddPostRequestBody = {
        user: userDB,
        text: postInput,
        imageUrl: downloadURL,
      };

      await Post.create(body);
    } else {
      // create post in database without the image

      const body: AddPostRequestBody = {
        user: userDB,
        text: postInput,
      };

      await Post.create(body);
    }
  } catch (error: any) {
    throw new Error("failed to create post", error);
  }

  // revalidatePath '/' - home page

  revalidatePath("/")
}
