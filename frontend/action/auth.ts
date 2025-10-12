"use server";

import { BACKEND_URL } from "@/lib/constants";
import { createSession } from "@/lib/session";
import { FormState, SigninFormSchema, SignupFormSchema } from "@/lib/type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(
  state: FormState,
  data: FormData
): Promise<FormState> {
  const name = data.get("name");
  const email = data.get("email");
  const password = data.get("password");

  const validationFields = SignupFormSchema.safeParse({
    name,
    email,
    password,
  });
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });

  if (!response.ok) {
    const resData = await response.json();
    return {
      message: resData.message,
    };
  }
  redirect("/auth/signin");
}

export async function signin(
  state: FormState,
  data: FormData
): Promise<FormState> {
  const email = data.get("email");
  const password = data.get("password");

  const validationFields = SigninFormSchema.safeParse({
    email,
    password,
  });
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });

  if (!response.ok) {
    const resData = await response.json();
    return {
      message: resData.message,
    };
  }
  const result = await response.json();

  await createSession({
    user: {
      id: result.id,
      name: result.name,
      role: result.role,
    },
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  });

  redirect("/");
}

export const refreshToken = async (oldRefreshToken: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      body: JSON.stringify({ refreshToken: oldRefreshToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const { accessToken, refreshToken } = await response.json();

    // await updateToken({ accessToken, refreshToken });
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (sessionCookie) {
      headers.Cookie = `${sessionCookie.name}=${sessionCookie.value}`;
    }

    const updateRes = await fetch(
      `http://localhost:3000/api/auth/refresh-token`,
      {
        method: "POST",
        body: JSON.stringify({ accessToken, refreshToken }),
        headers,
      }
    );

    // console.log("Update token response:", updateRes);

    if (!updateRes.ok) {
      throw new Error("Failed to update token in session");
    }

    return accessToken;
  } catch (error) {
    console.error("Refresh token error", error);
    return null;
  }
};
