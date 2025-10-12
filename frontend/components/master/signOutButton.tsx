"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/signout", { method: "GET" });
      // Force a full page reload, bypassing the server cache
      router.refresh();
    } catch (error) {
      console.error("Sign-out failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
      disabled={loading}
    >
      Sign out
    </button>
  );
}
