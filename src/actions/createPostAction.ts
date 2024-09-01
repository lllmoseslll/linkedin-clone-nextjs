"use server";

import { currentUser } from "@clerk/nextjs/server";

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
    // upload the image if there is one 
    // create post in database 
    // revalidatePath '/' - home page 
}
