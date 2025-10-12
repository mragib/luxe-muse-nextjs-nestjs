import { getSession } from "@/lib/session";
import Link from "next/link";
import React from "react";
import SignOutButton from "./signOutButton";

export default async function SignInButton() {
  const session = await getSession();
  return (
    <div className="flex items-center ml-auto gap-2">
      {!session || !session.user ? (
        <>
          <Link
            href="/auth/signin"
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Sign Up
          </Link>
        </>
      ) : (
        <>
          <span className="text-white">Hello, {session.user.name}</span>
          <SignOutButton />
        </>
      )}
    </div>
  );
}
