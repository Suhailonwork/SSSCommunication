import { cookies } from "next/headers";
import { createSession, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return Response.json({ error: "Username and password are required" }, { status: 400 });
  }

  const token = await createSession(username, password);
  if (!token) {
    return Response.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return Response.json({ success: true });
}
