import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import AvatorComponent from "./AvatorComponent";

async function UserInformation() {
  const user = await currentUser();
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;

  return (
    <div className="flex flex-col justify-center items-center bg-white mr-6 rounded-lg border py-4">
      <AvatorComponent />

      <SignedIn>
        <div className="text-center">
          <p className="font-semibold">
            {firstName} {lastName}
          </p>
          <p className="text-xs">
            @{firstName}
            {lastName}-lll{user?.id?.slice(-5)}lll
          </p>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="text-center space-y-2">
          <p className="font-semibold">You are not signed in </p>
          <SignInButton>Sign in</SignInButton>
        </div>
      </SignedOut>
      <hr className="w-full border-gray-200 my-5" />

      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-400 ">Posts</p>
        <p className="text-blue-400">{/* {userPosts.length} */}0</p>
      </div>
      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-400 ">Comments</p>
        <p className="text-blue-400">{/* {userComments.length} */}0</p>
      </div>
    </div>
  );
}

export default UserInformation;
