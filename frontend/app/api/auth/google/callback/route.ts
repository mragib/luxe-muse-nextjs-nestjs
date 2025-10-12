import { createSession } from "@/lib/session";
import { Role } from "@/lib/type";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const role = searchParams.get("role");

  if (!userId || !name || !accessToken || !refreshToken) {
    return new Response(
      JSON.stringify({ message: "Missing required query parameters" }),
      { status: 400 }
    );
  }

  await createSession({
    user: {
      id: userId,
      name,
      role: role as Role,
    },
    accessToken,
    refreshToken,
  });

  redirect("/");
}
