import { BACKEND_URL } from "@/lib/constants";
import { authFetch } from "@/lib/data-service";
import { destroySession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = await authFetch(`${BACKEND_URL}/auth/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    await destroySession();
  }

  revalidatePath("/", "layout");
  revalidatePath("/", "page");

  return NextResponse.redirect(new URL("/", req.nextUrl));
}
