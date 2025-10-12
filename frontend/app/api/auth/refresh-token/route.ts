import { updateToken } from "@/lib/session";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { accessToken, refreshToken } = body;
  if (!accessToken || !refreshToken) {
    return new Response(
      JSON.stringify({
        message: "Access token and refresh token are required",
      }),
      { status: 400 }
    );
  }
  try {
    const result = await updateToken({ accessToken, refreshToken });
  } catch (error) {
    console.error("Error updating tokens:", error);
  }

  return new Response(
    JSON.stringify({ message: "Tokens updated successfully" }),
    { status: 200 }
  );
}
