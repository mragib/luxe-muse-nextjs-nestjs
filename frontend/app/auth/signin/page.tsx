import React from "react";
import Signinform from "./signinform";

export default function SignIn() {
  return (
    <div className="text-2xl font-bolb bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>
      <Signinform />
      <a
        href="http://localhost:8000/auth/google/login"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mb-4"
      >
        Sign in with Google
      </a>
      <div className="flex justify-between gap-2"></div>
    </div>
  );
}
