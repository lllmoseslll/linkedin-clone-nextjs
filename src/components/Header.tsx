import Image from "next/image";
import {
  Briefcase,
  HomeIcon,
  MessagesSquare,
  SearchIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

function Header() {
  return (
    <div className="flex items-center p-2 max-w-6xl mx-auto">
      <Image
        src={
          "https://cdn3.iconfinder.com/data/icons/picons-social/57/11-linkedin-512.png"
        }
        className="rounded-lg"
        width={40}
        height={40}
        alt="logo"
      />
      <div className="flex-1 ">
        <form
          className="flex items-center space-x-1 bg-gray-100 p-2 
        rounded-md flex-1 mx-2 max-w-96"
        >
          <SearchIcon className="h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent flex-1 outline-none"
          />
        </form>
      </div>
      <div className="flex items-center space-x-4 px-6">
        <Link href={"/"} className="icon">
          <HomeIcon className="h-5" />
          <p>Home</p>
        </Link>
        <Link href={"/"} className="icon hidden md:flex">
          <UsersIcon className="h-5" />
          <p>Network</p>
        </Link>
        <Link href={"/"} className="icon hidden md:flex">
          <Briefcase className="h-5" />
          <p>Jobs</p>
        </Link>
        <Link href={"/"} className="icon hidden md:flex">
          <MessagesSquare className="h-5" />
          <p>Messaging</p>
        </Link>
        {/* User Button if signed in */}
        <SignedIn>
          <UserButton />
        </SignedIn>
        {/* Sign In Button if not signed in  */}
        <SignedOut>
          <Button asChild variant={"secondary"}>
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </div>
  );
}

export default Header;
