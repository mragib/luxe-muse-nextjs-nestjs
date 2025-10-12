"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Role } from "./type";
import { createSessionDB, getSessionBySessionId } from "./data-service";

export type session = {
  user: {
    id: string;
    name: string;
    role: Role;
  };
  accessToken: string;
  refreshToken: string;
};

const secretkey = process.env.SESSION_SECRET!;
const encodedSecret = new TextEncoder().encode(secretkey);

export const createSession = async (payload: session) => {
  try {
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedSecret);

    const sessionId = await createSessionDB({
      userId: payload.user.id,
      session,
    });

    (await cookies()).set("session", sessionId, {
      httpOnly: true,
      secure: true,
      expires: expiredAt,
      sameSite: "lax",
      path: "/",
    });

    return session;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create session", { cause: err });
  }
};

export const getSession = async () => {
  const cookieStore = (await cookies()).get("session")?.value;
  if (!cookieStore) return null;
  try {
    const data = await getSessionBySessionId(cookieStore);

    const { payload } = await jwtVerify(data.session, encodedSecret);
    return payload as session;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    redirect("/auth/signin");
  }
};

export const destroySession = async () => {
  (await cookies()).delete("session");
};

export const updateToken = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const cookiesStore = (await cookies()).get("session")?.value;

  if (!cookiesStore) return null;

  const data = await getSessionBySessionId(cookiesStore);

  const { payload } = await jwtVerify<session>(data.session, encodedSecret);

  if (!payload) throw new Error("Session payload not found");

  const newPayload: session = {
    user: {
      id: payload.user.id,
      name: payload.user.name,
      role: payload.user.role,
    },
    accessToken,
    refreshToken,
  };

  try {
    await createSession(newPayload);
  } catch (err) {
    console.error("Failed to update session:", err);
    return false;
  }

  return true;
};
